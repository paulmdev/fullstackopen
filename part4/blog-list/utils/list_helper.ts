import lodash from "lodash";
import { Blog } from "../models/blog";

const totalLikes = (blogs: Blog[]) => {
  const reducer = (likes: number, blog: Blog) => blog.likes + likes;
  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs: Blog[]) => {
  if (blogs.length === 0) return undefined;

  const foundBlog = lodash.maxBy(blogs, "likes");

  if (!foundBlog) return;

  const { likes, title, author } = foundBlog;

  return { likes, title, author };
};

const mostBlogs = (blogs: Blog[]) => {
  if (blogs.length === 0) return undefined;

  const countBlogsByAuthor = lodash.countBy(blogs, "author");

  const blogsByAuthor = Object.entries(countBlogsByAuthor).map((entry) => ({
    author: entry[0],
    blogs: entry[1],
  }));

  return lodash.maxBy(blogsByAuthor, "blogs");
};

const mostLikes = (blogs: Blog[]) => {
  if (blogs.length === 0) return undefined;

  const groupByAuthor = lodash.groupBy(blogs, "author");

  const aggregatedLikes = Object.entries(groupByAuthor).map((entry) => ({
    author: entry[0],
    likes: lodash.sumBy(entry[1], "likes"),
  }));

  return lodash.maxBy(aggregatedLikes, "likes");
};

export { totalLikes, favoriteBlog, mostBlogs, mostLikes };
