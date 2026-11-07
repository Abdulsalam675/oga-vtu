import bcrypt from "bcrypt";
import crypto from "crypto";

const SALT_ROUNDS = 10;

export function hashValue(rawValue: string): Promise<string> {
  return bcrypt.hash(rawValue, SALT_ROUNDS);
}

export function compareValues(
  rawValue: string,
  hashedValue: string,
): Promise<boolean> {
  return bcrypt.compare(rawValue, hashedValue);
}

export function hashString(rawValue: string): string {
  return crypto.createHash("sha256").update(rawValue).digest("hex");
}
