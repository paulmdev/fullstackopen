import bcrypt from "bcrypt";
import helpers from "./test_helpers";
import User from "../models/user";
import supertest from "supertest";
import app from "../app";

const api = supertest(app);

const ENDPOINT = "/api/users";

describe("When theres only one user", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash("root", 10);
    const rootUser = new User({ username: "root", name: "root", passwordHash });
    await rootUser.save();
  }, 100000);

  test("it gets just the desired parameters", async () => {
    const response = await api
      .get(ENDPOINT)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body.length).toBe(1);
    expect(response.body).toContainEqual({
      username: "root",
      name: "root",
      id: expect.any(String),
      blogs: [],
    });
  });

  test("A new user can be added", async () => {
    const prevUsers = await helpers.usersInDb();

    const user = {
      name: "sebastian",
      username: "sebastian",
      password: "pass",
    };

    await api
      .post(ENDPOINT)
      .send(user)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const newUsers = await helpers.usersInDb();

    expect(newUsers.length).toBe(prevUsers.length + 1);
  });

  test("a repeated username can't be added", async () => {
    const prevUsers = await helpers.usersInDb();

    const user = {
      name: "root",
      username: "root",
      password: "root",
    };

    const response = await api
      .post(ENDPOINT)
      .send(user)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(response.body.error).toContain("username must be unique");

    const newUsers = await helpers.usersInDb();

    expect(newUsers.length).toBe(prevUsers.length);
  });

  test("The password hash isn't returned", async () => {
    const prevUsers = await helpers.usersInDb();

    expect(prevUsers[0].passwordHash).not.toBeDefined();
  });
});

describe("Creating a new user fails if", () => {
  test("The username has 3 or less characters long", async () => {
    const user = { username: "dud", name: "fail", password: "abcde12345" };

    const response = await api
      .post(ENDPOINT)
      .send(user)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(response.body.error).toBe(
      "username must have more than 3 characters"
    );
  });

  test("The password has 3 or less characters long", async () => {
    const user = { username: "dude", name: "fail", password: "abc" };

    const response = await api
      .post(ENDPOINT)
      .send(user)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(response.body.error).toBe(
      "password must have more than 3 characters"
    );
  });
});
