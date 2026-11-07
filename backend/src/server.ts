import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";

const app = express();
app.set("trust proxy", 1);
app.use(express.json());
app.use(cookieParser());
const PORT = 5000;

app.use("/auth", authRoutes);
app.use("/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
