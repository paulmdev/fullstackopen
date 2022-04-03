import supertest from "supertest";
import app from "../app";
import bcrypt from "bcrypt";
import User from "../models/user";

const api = supertest(app);

beforeAll(async () => {
  await User.deleteMany({});
  const passwordHash = await bcrypt.hash("secret", 10);
  const rootUser = new User({
    username: "user",
    name: "username",
    passwordHash,
  });
  await rootUser.save();
}, 100000);

test("authenticates successfully", async () => {
  const response = await api
    .post("/api/login")
    .send({ username: "user", password: "secret" })
    .expect(200)
    .expect("Content-Type", /application\/json/);

  expect(response.body.token).toBeDefined();
  expect(response.body).toMatchObject({
    token: expect.any(String),
    name: "username",
    username: "user",
  });
});

test("fails if the password is wrong", async () => {
  const response = await api
    .post("/api/login")
    .send({ username: "user", password: "wrong-secret" })
    .expect(401);

  expect(response.body.error).toBe("invalid username or password");
});
