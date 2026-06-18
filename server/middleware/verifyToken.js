import jwt from "jsonwebtoken";
import { createError } from "../error.js";

export const verifyToken = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return next(createError(401, "You are not authenticated!"));
    }

    const token = req.headers.authorization.split(" ")[1];

    if (!token) return next(createError(401, "You are not authenticated"));
    console.log("AUTH HEADER:", req.headers.authorization);
console.log("TOKEN:", token);
console.log("JWT SECRET:", process.env.JWT);

    const decode = jwt.verify(token, process.env.JWT);
    req.user = decode;
    return next();
  } catch (err) {
    next(err);
  }
};
