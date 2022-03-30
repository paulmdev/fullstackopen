const router = require("express").Router();
const Blog = require("../models/blog");

router.get("/", async (request, response, next) => {
  try {
    const blogs = await Blog.find({});
    return response.json(blogs);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (request, response, next) => {
  try {
    const blog = new Blog(request.body);
    const result = await blog.save();
    response.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
