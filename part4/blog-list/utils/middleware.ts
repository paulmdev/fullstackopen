import logger from "./logger";
import { NextFunction, Request, Response, RequestHandler } from "express";
import { CustomRequest } from "../types/CustomHandler";

const requestLogger: RequestHandler = (request, _response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};

const unknownEndpoint: RequestHandler = (_request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

// eslint-disable-next-line consistent-return
const errorHandler = (
  error: { message?: string; name?: string },
  _request: Request,
  response: Response,
  next: NextFunction
): any => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }
  if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

const tokenExtractor: RequestHandler = (
  request: CustomRequest,
  _response,
  next
) => {
  const authorization = request.get("authorization");

  if (authorization && authorization.match(/bearer\s.*/i)) {
    request.token = authorization.substring(7);
  }

  next();
};

export default { errorHandler, requestLogger, unknownEndpoint, tokenExtractor };
