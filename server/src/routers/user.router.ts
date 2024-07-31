import { Router } from "express";
import { signupUserController } from "../controllers/user/signupuser.controller";
import { loginController } from "../controllers/user/login.controller";
import { logoutController } from "../controllers/user/logout.controller";
import { getUserController } from "../controllers/user/getuser.controller";

const userRouter = Router();

userRouter
  .route("/user")
  .post(signupUserController)
  .get(getUserController)
  .delete(logoutController);
userRouter.route(`/login`).post(loginController);
export default userRouter;
