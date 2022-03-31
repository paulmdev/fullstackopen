/* eslint-disable no-param-reassign,no-underscore-dangle */
import mongoose from "mongoose";

export interface Blog {
  title: string;
  author: string;
  url: string;
  likes: number;
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
});

blogSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default mongoose.model<Blog>("Blog", blogSchema);
