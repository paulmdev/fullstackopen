import { Router } from "express";

import Blog from "../models/blog";

const router = Router();

router.get("/", async (_request, response) => {
  const blogs = await Blog.find({});
  return response.json(blogs);
});

router.post("/", async (request, response) => {
  const blog = new Blog(request.body);
  const result = await blog.save();
  response.status(201).json(result);
});

router.delete("/:id", async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  return res.sendStatus(204);
});

router.put("/:id", async (req, res) => {
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
});

export default router;
