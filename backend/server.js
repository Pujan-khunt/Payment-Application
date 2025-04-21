import express from "express";
import "dotenv/config";
import { connectDB } from "./config/connectDB.config.js";
import cors from "cors";

connectDB();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors({
  origin: ["https://payment-application-nine.vercel.app", "http://localhost:5173"],
  credentials: true
}));

import userRouter from "./routes/user.router.js";
import accountRouter from "./routes/account.router.js";

app.use("/api/v1", userRouter);
app.use("/api/v1", accountRouter);

app.listen(PORT);
