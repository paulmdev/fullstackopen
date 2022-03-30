const app = require("../app");
const Blog = require("../models/blog");
const supertest = require("supertest");
const mongoose = require("mongoose");
const helpers = require("./test_helpers");

const api = supertest(app);

beforeAll(async () => {
  await Blog.deleteMany({});
  const blogObjects = helpers.blogs.map((blog) => new Blog(blog));
  const promises = blogObjects.map((blog) => blog.save());
  await Promise.all(promises);
}, 100000);

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

describe("when saving a blog post", function () {
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
});

afterAll(() => mongoose.connection.close());
