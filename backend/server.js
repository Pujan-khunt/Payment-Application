import express from "express";
import "dotenv/config";
import { connectDB } from "./config/connectDB.config.js";
import cors from "cors";

connectDB();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

import signUpRouter from "./routes/sign-up.route.js";
import updateProfileRouter from "./routes/update-profile.route.js";
import bulkRouter from "./routes/bulk.route.js";

app.use("/api/v1", signUpRouter);
app.use("/api/v1", updateProfileRouter);
app.use("/api/v1", bulkRouter);

app.listen(PORT, () => {
  console.log(`Server Unfortunately Running at http://localhost:${PORT}`);
})
