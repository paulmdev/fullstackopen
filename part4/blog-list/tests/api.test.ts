import supertest from "supertest";
import mongoose from "mongoose";
import app from "../app";
import Blog from "../models/blog";
import helpers from "./test_helpers";
import User from "../models/user";

const api = supertest(app);

beforeAll(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});
  await User.insertMany(helpers.users);
  await Blog.insertMany(helpers.blogs);
}, 100000);

describe("When getting some blog posts", () => {
  test("returns the correct amount of blog post in JSON", async () => {
    const response = await api
      .get(ENDPOINT)
      .expect(200)
      .expect("Content-Type", /application\/json/);
    expect(response.body).toHaveLength(helpers.blogs.length);
  });

  test("verifies that the unique identifier property is named id", async () => {
    const response = await api.get(ENDPOINT);

    const oneBlog = response.body[0];

    expect(oneBlog.id).toBeDefined();
  });
});

const ENDPOINT = "/api/blogs";
describe("when saving a blog post", function () {
  afterEach(async () => {
    await Blog.deleteOne({ title: "Atomic Habits" });
  });

  const blogPost = {
    title: "Atomic Habits",
    author: "James Clear",
    likes: 99,
    user: "62467482bc65362b82563f80",
    url: "https://www.amazon.com/Atomic-Habits-Proven-Build-Break/dp/0735211299",
  };

  test("it successfully saves", async () => {
    const token = await helpers.logUserIn(api, "jclear", "password");

    await api
      .post(ENDPOINT)
      .set("Authorization", `Bearer ${token}`)
      .send(blogPost)
      .expect(201)
      .expect("Content-Type", /application\/json/);
  });

  test("the number of blog post is increased by one", async () => {
    const token = await helpers.logUserIn(api, "jclear", "password");

    await api
      .post(ENDPOINT)
      .send(blogPost)
      .set("Authorization", `Bearer ${token}`);

    const blogs = await Blog.find({});

    expect(blogs).toHaveLength(helpers.blogs.length + 1);
  });

  test("the content is saved correctly", async () => {
    const token = await helpers.logUserIn(api, "jclear", "password");
    await api
      .post(ENDPOINT)
      .send(blogPost)
      .set("Authorization", `Bearer ${token}`);
    const blogs = await Blog.find({});
    const titles = blogs.map((blog) => blog.title);
    expect(titles).toContainEqual(blogPost.title);
  });

  test("the likes property defaults to 0 if not provided", async () => {
    const blogPost = {
      title: "Atomic Habits",
      author: "James Clear",
      user: "62467482bc65362b82563f80",
      url: "https://www.amazon.com/Atomic-Habits-Proven-Build-Break/dp/0735211299",
    };

    const token = await helpers.logUserIn(api, "jclear", "password");

    const response = await api
      .post(ENDPOINT)
      .set("Authorization", `Bearer ${token}`)
      .send(blogPost);

    expect(response.body.likes).toBe(0);
  });

  test("the request fails if title and url are missing", async () => {
    const blogPost = {
      author: "James Clear",
    };

    const token = await helpers.logUserIn(api, "jclear", "password");

    await api
      .post(ENDPOINT)
      .send(blogPost)
      .set("Authorization", `Bearer ${token}`)
      .expect(400);
  });

  test("it saves with its user", async () => {
    const blogPost = {
      title: "Atomic Habits",
      author: "James Clear",
      likes: 99,
      url: "https://www.amazon.com/Atomic-Habits-Proven-Build-Break/dp/0735211299",
    };

    const token = await helpers.logUserIn(api, "jclear", "password");

    const response = await api
      .post(ENDPOINT)
      .set("Authorization", `Bearer ${token}`)
      .send(blogPost)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    expect(response.body.user).toBeDefined();
  });
});

describe("When modifying a blog post", () => {
  test("increments the like count successfully", async () => {
    const { _id, title, likes } = helpers.listWithOneBlog[0];
    await api
      .put(`${ENDPOINT}/${_id}`)
      .send({ likes: likes + 1 })
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const blog = await Blog.find({ title });

    expect(blog[0].likes).toBe(likes + 1);
  });

  test("fails if likes is undefined", async () => {
    const { _id, title } = helpers.listWithOneBlog[0];
    await api.put(`${ENDPOINT}/${_id}`).send({ title }).expect(400);
  });
});

describe("When deleting a blog post", () => {
  test("deletes successfully", async () => {
    const { _id, title } = helpers.listWithOneBlog[0];
    await api.delete(`${ENDPOINT}/${_id}`).expect(204);

    const blogs = await Blog.find({});

    expect(blogs).toHaveLength(helpers.blogs.length - 1);

    const titles = blogs.map((blog) => blog.title);
    expect(titles).not.toContain(title);
  });
});

afterAll(() => mongoose.connection.close());
