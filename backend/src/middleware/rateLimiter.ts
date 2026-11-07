import rateLimit from "express-rate-limit";

export const dataSavingLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  limit: 10, // Max 10 submissions per hour per IP
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    status: false,
    message: "Too many registration attempts. Please try again later.",
  },
});

export const actionTriggerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes window
  limit: 5, // Max 5 requests per 15 minutes per IP
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    status: false,
    message:
      "Too many requests. Please wait a few minutes before trying again.",
  },
});

export const codeVerificationLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes window
  limit: 5, // Max 5 entry attempts per 15 minutes per IP
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    status: false,
    message:
      "Too many incorrect verification attempts. Please try again after 15 minutes.",
  },
});
