import rateLimit from "express-rate-limit";

export const signUpLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    status: false,
    message: "Too many account registration attempts. Please try again later.",
  },
});

export const resendEmailLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes window
  limit: 3,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    status: false,
    message: "Too many email requests. Please try again later.",
  },
});

export const verifyEmailLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes window
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    status: false,
    message: "Too many verification attempts. Please try again later.",
  },
});

export const forgotPasswordLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes window
  limit: 3,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    status: false,
    message: "Too many reset requests. Please try again later.",
  },
});
