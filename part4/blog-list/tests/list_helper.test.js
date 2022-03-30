const {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
} = require("../utils/list_helper");
const helpers = require("./test_helpers");

const listWithOneBlog = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
];

describe("total likes", () => {
  test("of empty list is 0", () => {
    expect(totalLikes([])).toBe(0);
  });

  test("when list has only one blog is equals to that blog's likes", () => {
    expect(totalLikes(listWithOneBlog)).toBe(5);
  });

  test("when the list is bigger than one blog", () => {
    expect(totalLikes(helpers.blogs)).toBe(36);
  });
});

describe("favorite blog", () => {
  test("of empty list", () => {
    expect(favoriteBlog([])).toBe(undefined);
  });

  test("when the list has only one blog", () => {
    expect(favoriteBlog(listWithOneBlog)).toStrictEqual({
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      likes: 5,
    });
  });

  test("when the list has many blogs", () => {
    expect(favoriteBlog(helpers.blogs)).toStrictEqual({
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    });
  });
});

test("finds author with highest blog count", () => {
  expect(mostBlogs(helpers.blogs)).toStrictEqual({
    author: "Robert C. Martin",
    blogs: 3,
  });
});

test("finds author with most likes", () => {
  expect(mostLikes(helpers.blogs)).toStrictEqual({
    author: "Edsger W. Dijkstra",
    likes: 17,
  });
});
