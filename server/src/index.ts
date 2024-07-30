import express from "express";
import { config } from "dotenv";
config();
import "./configuration/mongo.config";
import cors from "cors";
const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.listen(5000, () => console.log(`Server start`));
