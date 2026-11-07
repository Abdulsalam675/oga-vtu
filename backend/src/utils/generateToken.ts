import jwt from "jsonwebtoken";
import "dotenv/config";
import crypto from "crypto";

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;

if (!ACCESS_SECRET) {
  throw new Error("JWT_ACCESS_SECRET is not defined");
}
const ACCESS_TOKEN_SECRET: string = ACCESS_SECRET;
export function generateAccessToken(userId: string): string {
  return jwt.sign({ userId }, ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
}

export function generateRefreshToken(): string {
  return crypto.randomBytes(64).toString("hex");
}
