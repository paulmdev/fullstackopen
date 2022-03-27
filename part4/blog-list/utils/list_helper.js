const lodash = require('lodash');

const dummy = (blogs) => 1;

const totalLikes = (blogs) => {
  const reducer = (likes, blog) => blog.likes + likes;
  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return undefined;

  const maximumLikes = Math.max(...blogs.map((blog) => blog.likes));
  const { likes, title, author } = blogs.find((blog) => blog.likes === maximumLikes);
  return { likes, title, author };
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return undefined;

  const countBlogsByAuthor = lodash.countBy(blogs, 'author');

  const blogsByAuthor = Object.entries(countBlogsByAuthor).map((entry) => (
    { author: entry[0], blogs: entry[1] }
  ));

  return lodash.maxBy(blogsByAuthor, 'blogs');
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return undefined;

  const groupByAuthor = lodash.groupBy(blogs, 'author');

  const aggregatedLikes = Object.entries(groupByAuthor).map((entry) => ({ author: entry[0], likes: lodash.sumBy(entry[1], 'likes') }));

  return lodash.maxBy(aggregatedLikes, 'likes');
};

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes,
};
