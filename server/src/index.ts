import express from "express";
import { config } from "dotenv";
config();
import "./configuration/mongo.config";
import cors from "cors";
import userRouter from "./routers/user.router";
const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use(`/api/user`, userRouter);

app.listen(5000, () => console.log(`Server start`));
