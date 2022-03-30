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

router.delete("/:id", async (req, res, next) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    if (req.body.likes === undefined) return res.sendStatus(400);

    const { likes } = req.body;

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { likes },
      {
        new: true,
      }
    );
    return res.json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
