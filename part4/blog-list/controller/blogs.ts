import { Router } from "express";
import jwt from "jsonwebtoken";

import Blog from "../models/blog";
import User from "../models/user";
import config from "../utils/config";
import { CustomRequest } from "../types/CustomHandler";

const router = Router();

router.get("/", async (_request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });

  return response.json(blogs);
});

router.post("/", async (request: CustomRequest, response) => {
  if (!request.token)
    return response.status(400).json({ error: "invalid or missing token" });

  const decodedUser = jwt.verify(request.token, config.SECRET!) as {
    id: string;
    name: string;
    username: string;
  };

  if (!decodedUser.id)
    return response.status(400).json({ error: "invalid or missing token" });

  const blog = new Blog({
    ...request.body,
    user: decodedUser.id,
  });
  const result = await blog.save();

  await User.findByIdAndUpdate(decodedUser.id, { $push: { blogs: result.id } });
  return response.status(201).json(result);
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
