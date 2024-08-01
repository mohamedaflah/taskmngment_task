import express from "express";
import { config } from "dotenv";
config();
import "./configuration/mongo.config";
import cors from "cors";
import userRouter from "./routers/user.router";
import cookieParser from "cookie-parser";
import taskRouter from "./routers/task.router";
import session from "express-session";
import MongoDBStore from "connect-mongodb-session";
const MongoStore = MongoDBStore(session);
const app = express();
const store = new MongoStore({
  uri: String(process.env.MONGODB_URI), // Your MongoDB connection string
  collection: "sessions",
});
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://taskmngment-task.vercel.app"],
    credentials: true,
  })
);
app.use(express.json());
// app.use(
//   session({
//     secret: process.env.JWT_SECRET as string, // Change this to your own secret key
//     resave: false,
//     saveUninitialized: false,
//     store: store,
//     cookie: {
//       httpOnly: true,
//       secure: process.env.NODE_ENV ? false : true,
//       sameSite: "strict",
      
//     },
//   })
// );
app.use(`/api/user`, userRouter);
app.use(`/api/todo`, taskRouter);
app.listen(5000, () => console.log(`Server start`));
