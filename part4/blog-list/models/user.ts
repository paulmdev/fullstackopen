import mongoose from "mongoose";
import { Blog } from "./blog";

export interface User {
  username: string;
  name: string;
  passwordHash: string;
  blogs: Blog[];
}

const userSchema = new mongoose.Schema<User>({
  name: {
    required: true,
    type: String,
  },
  passwordHash: {
    required: true,
    type: String,
  },
  username: {
    required: true,
    type: String,
    unique: true,
  },
  blogs: [{ type: mongoose.Types.ObjectId, ref: "Blog" }],
});

userSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

export default mongoose.model<User>("User", userSchema);
