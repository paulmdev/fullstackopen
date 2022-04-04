import { RequestHandler, Request } from "express";

export interface CustomRequest extends Request {
  token?: string;
}

export interface CustomRequestHandler extends RequestHandler {
  request: CustomRequest;
}
