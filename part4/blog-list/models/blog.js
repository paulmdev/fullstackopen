/* eslint-disable no-param-reassign,no-underscore-dangle */
const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
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
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Blog", blogSchema);
