require("express-async-errors");
import mongoose from "mongoose";
import cors from "cors";
import express from "express";

import config from "./utils/config";
import middleware from "./utils/middleware";
import logger from "./utils/logger";
import blogRouter from "./controller/blogs";
const app = express();

mongoose
  .connect(config.MONGODB_URI ?? "")
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/blogs", blogRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
