import jwt from "jsonwebtoken";
import "dotenv/config";
import type { Request, Response, NextFunction } from "express";

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
if (!ACCESS_SECRET) {
  throw new Error("JWT_ACCESS_SECRET is not defined");
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ status: false, message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ status: false, message: "No token provided" });
  }

  try {
    const decodedToken = jwt.verify(token, ACCESS_SECRET) as { userId: string };

    req.user = { id: decodedToken.userId };
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ status: false, message: "Invalid or expired token" });
  }
};
