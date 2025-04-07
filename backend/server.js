import express from "express";
import "dotenv/config";
import { connectDB } from "./config/connectDB.config.js";
import cors from "cors";

connectDB();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

import userRouter from "./routes/user.router.js";
import accountRouter from "./routes/account.router.js";

app.use("/api/v1", userRouter);
app.use("/api/v1", accountRouter);

app.listen(PORT, () => {
  console.log(`Server Unfortunately Running at http://localhost:${PORT}`);
})
