import { Router } from "express";

import Blog from "../models/blog";
import User from "../models/user";

const router = Router();

router.get("/", async (_request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });

  return response.json(blogs);
});

router.post("/", async (request, response) => {
  let { user } = request.body;

  // Gets the id of any user if the user is not provided in the request.
  user ??= (await User.findOne())?.id;

  const blog = new Blog({
    ...request.body,
    user,
  });

  const result = await blog.save();
  await User.findByIdAndUpdate(user, { $push: { blogs: result.id } });
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
