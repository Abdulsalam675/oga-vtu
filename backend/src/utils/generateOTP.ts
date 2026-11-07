import crypto from "crypto";

export function generateOTP(): string {
  return crypto.randomInt(100000, 1000000).toString(); // Generates a 6-digit OTP
}
