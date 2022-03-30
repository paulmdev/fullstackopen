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

afterAll(() => mongoose.connection.close());
