import { Router } from "express";
import User from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../utils/config";

const router = Router();

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  const isPasswordCorrect =
    user !== null ? await bcrypt.compare(password, user.passwordHash) : false;

  if (!(user && isPasswordCorrect))
    return res.status(401).json({ error: "invalid username or password" });

  const userForToken = { username: user.username, id: user.id };

  const token = jwt.sign(userForToken, config.SECRET!);

  return res.status(200).json({ token, username, name: user.name });
});

export default router;
