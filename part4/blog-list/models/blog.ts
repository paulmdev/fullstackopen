/* eslint-disable no-param-reassign,no-underscore-dangle */
import mongoose from "mongoose";
import { User } from "./user";

export interface Blog {
  title: string;
  author: string;
  url: string;
  likes: number;
  user: User | string;
}

const blogSchema = new mongoose.Schema<Blog>({
  title: {
    required: true,
    type: String,
  },
  author: {
    required: true,
    type: String,
  },
  url: {
    required: true,
    type: String,
  },
  likes: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

blogSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default mongoose.model<Blog>("Blog", blogSchema);
