import {
  favoriteBlog,
  mostBlogs,
  mostLikes,
  totalLikes,
} from "../utils/list_helper";
import helpers from "./test_helpers";

describe("total likes", () => {
  test("of empty list is 0", () => {
    expect(totalLikes([])).toBe(0);
  });

  test("when list has only one blog is equals to that blog's likes", () => {
    expect(totalLikes(helpers.listWithOneBlog)).toBe(5);
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
    expect(favoriteBlog(helpers.listWithOneBlog)).toStrictEqual({
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
