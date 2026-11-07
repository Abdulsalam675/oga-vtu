import { pool } from "../config/db.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken.js";
import { hashString } from "../utils/hash.js";

interface UserSession {
  accessToken: string;
  refreshToken: string;
}

export async function generateUserSession(
  userId: string,
): Promise<UserSession> {
  const accessToken = generateAccessToken(userId);
  const rawRefreshToken = generateRefreshToken();
  const hashedRefreshToken = hashString(rawRefreshToken);
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

  await pool.query(
    `INSERT INTO refresh_tokens (user_id, token_hash, expires_at) VALUES ($1, $2, $3)`,
    [userId, hashedRefreshToken, expiresAt],
  );

  return { accessToken, refreshToken: rawRefreshToken };
}
