const app = require("../app");
const Blog = require("../models/blog");
const supertest = require("supertest");
const mongoose = require("mongoose");
const helpers = require("./test_helpers");

const api = supertest(app);

beforeAll(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helpers.blogs);
}, 100000);

describe("When getting some blog posts", () => {
  test("returns the correct amount of blog post in JSON", async () => {
    const response = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
    expect(response.body).toHaveLength(helpers.blogs.length);
  });

  test("verifies that the unique identifier property is named id", async () => {
    const response = await api.get("/api/blogs");

    const oneBlog = response.body[0];

    expect(oneBlog.id).toBeDefined();
  });
});

describe("when saving a blog post", function () {
  afterEach(async () => {
    await Blog.deleteOne({ title: "Atomic Habits" });
  });

  const blogPost = {
    title: "Atomic Habits",
    author: "James Clear",
    likes: 99,
    url: "https://www.amazon.com/Atomic-Habits-Proven-Build-Break/dp/0735211299",
  };

  test("it successfully saves", async () => {
    await api
      .post("/api/blogs")
      .send(blogPost)
      .expect(201)
      .expect("Content-Type", /application\/json/);
  });

  test("the number of blog post is increased by one", async () => {
    await api.post("/api/blogs").send(blogPost);

    const blogs = await Blog.find({});

    expect(blogs).toHaveLength(helpers.blogs.length + 1);
  });

  test("the content is saved correctly", async () => {
    await api.post("/api/blogs").send(blogPost);
    const blogs = await Blog.find({});
    const titles = blogs.map((blog) => blog.title);
    expect(titles).toContainEqual(blogPost.title);
  });

  test("the likes property defaults to 0 if not provided", async () => {
    const blogPost = {
      title: "Atomic Habits",
      author: "James Clear",
      url: "https://www.amazon.com/Atomic-Habits-Proven-Build-Break/dp/0735211299",
    };

    const response = await api.post("/api/blogs").send(blogPost);

    expect(response.body.likes).toBe(0);
  });

  test("the request fails if title and url are missing", async () => {
    const blogPost = {
      author: "James Clear",
    };

    await api.post("/api/blogs").send(blogPost).expect(400);
  });
});

describe("When modifying a blog post", () => {
  test("increments the like count successfully", async () => {
    const { _id, title, likes } = helpers.listWithOneBlog[0];
    await api
      .put(`/api/blogs/${_id}`)
      .send({ likes: likes + 1 })
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const blog = await Blog.find({ title });

    expect(blog[0].likes).toBe(likes + 1);
  });

  test("fails if likes is undefined", async () => {
    const { _id, title } = helpers.listWithOneBlog[0];
    await api.put(`/api/blogs/${_id}`).send({ title }).expect(400);
  });
});

describe("When deleting a blog post", () => {
  test("deletes successfully", async () => {
    const { _id, title } = helpers.listWithOneBlog[0];
    await api.delete(`/api/blogs/${_id}`).expect(204);

    const blogs = await Blog.find({});

    expect(blogs).toHaveLength(helpers.blogs.length - 1);

    const titles = blogs.map((blog) => blog.title);
    expect(titles).not.toContain(title);
  });
});

afterAll(() => mongoose.connection.close());
