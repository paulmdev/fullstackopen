import bcrypt from "bcrypt";
import helpers from "./test_helpers";
import User from "../models/user";
import supertest from "supertest";
import app from "../app";

const api = supertest(app);

describe("When theres only one user", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash("root", 10);
    const rootUser = new User({ username: "root", name: "root", passwordHash });
    await rootUser.save();
  }, 100000);

  test("A new user can be added", async () => {
    const prevUsers = await helpers.usersInDb();

    const user = {
      name: "sebastian",
      username: "sebastian",
      password: "pass",
    };

    await api
      .post("/api/users")
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
      .post("/api/users")
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
