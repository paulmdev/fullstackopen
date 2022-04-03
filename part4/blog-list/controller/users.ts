import { Router } from "express";
import bcrypt from "bcrypt";
import User from "../models/user";

const router = Router();

router.get("/", async (_request, response) => {
  const users = await User.find({}).populate("blogs", {
    url: 1,
    title: 1,
    author: 1,
    id: 1,
  });
  return response.json(users);
});

router.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  if (username.length <= 3 || password.length <= 3)
    return response.status(400).json({
      error: `${
        username.length <= 3 ? "username" : "password"
      } must have more than 3 characters`,
    });

  const duplicatedUsername = await User.find({ username });

  if (duplicatedUsername.length)
    return response.status(400).json({ error: "username must be unique" });

  const salt = 10;

  const passwordHash = await bcrypt.hash(password, salt);

  const user = new User({
    name,
    username,
    passwordHash,
  });

  const savedUser = await user.save();

  return response.status(201).json(savedUser);
});

export default router;
