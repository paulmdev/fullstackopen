import User from "../models/user";
import supertest from "supertest";

const listWithOneBlog = [
  {
    _id: "5a422a851b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    user: "62467482bc65362b82563f78",
    likes: 5,
    __v: 0,
  },
];

const users = [
  {
    _id: "62467482bc65362b82563f77",
    username: "mchan",
    name: "Michael Chan",
    passwordHash:
      "$2y$10$.1rLx58HpPp0qrOVPi2XaODl/Rbrep/JVC7JIarsEIVy2C6gm6rsO",
    blogs: ["5a422a851b54a676234d17f7"],
  },
  {
    id: "62467482bc65362b82563f78",
    username: "dijks",
    name: "Edsger W. Dijkstra",
    passwordHash:
      "$2y$10$.1rLx58HpPp0qrOVPi2XaODl/Rbrep/JVC7JIarsEIVy2C6gm6rsO",
    blogs: ["5a422b3a1b54a676234d17f9", "5a422a851b54a676234d17f7"],
  },
  {
    id: "62467482bc65362b82563f79",
    username: "uncle_bob",
    name: "Robert C. Martin",
    passwordHash:
      "$2y$10$.1rLx58HpPp0qrOVPi2XaODl/Rbrep/JVC7JIarsEIVy2C6gm6rsO",
    blogs: [
      "5a422b891b54a676234d17fa",
      "5a422ba71b54a676234d17fb",
      "5a422a851b54a676234d17f7",
    ],
  },
  {
    id: "62467482bc65362b82563f80",
    username: "jclear",
    name: "James Clear",
    passwordHash:
      "$2a$12$E4qg1inM5.so7D21I38vCOcoy8IF620A4E0ul3AQW3F/Q94xHVnAe",
    blogs: [],
  },
];

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    user: "62467482bc65362b82563f77",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422a851b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    user: "62467482bc65362b82563f78",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    user: "62467482bc65362b82563f78",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    user: "62467482bc65362b82563f79",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    user: "62467482bc65362b82563f79",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    user: "62467482bc65362b82563f79",
    likes: 2,
    __v: 0,
  },
];

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

const getAuthToken = async (
  api: supertest.SuperTest<supertest.Test>,
  username: string,
  password: string
) => {
  const response = await api.post("/api/login").send({ username, password });

  const { token } = response.body;

  return token;
};

export default {
  blogs,
  listWithOneBlog,
  users,
  usersInDb,
  logUserIn: getAuthToken,
};
