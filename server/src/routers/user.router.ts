import { Router } from "express";

const userRouter = Router();

userRouter.route("/user").post().get();
userRouter.route(`/login`).post();
