import { Router } from "express";
import bcrypt from "bcrypt";
import User from "../models/user";

const router = Router();

router.post("/", async (request, response) => {
  const { username, name, password } = request.body;

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