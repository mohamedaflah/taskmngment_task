import { Router } from "express";
import { signupUserController } from "../controllers/user/signupuser.controller";
import { loginController } from "../controllers/user/login.controller";
import { logoutController } from "../controllers/user/logout.controller";

const userRouter = Router();

userRouter
  .route("/user")
  .post(signupUserController)
  .get()
  .delete(logoutController);
userRouter.route(`/login`).post(loginController);
export default userRouter;
