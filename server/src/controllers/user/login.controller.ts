import { Request, Response } from "express";
import { loginUserService } from "../../services/loginuser.service";
import { generateJWT } from "../../lib/generateToken";

export async function loginController(req: Request, res: Response) {
  try {
    const user = await loginUserService(req.body);
    const tkn = generateJWT({ id: user._id });
    res.cookie("taskmanagementauthtoken", tkn, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      // domain: "taskmngment-task.vercel.app",
      // path: "/",
    });
    return res.status(200).json({ status: false, user, message: "Successful" });
  } catch (error: Error | any) {
    return res.status(500).json({ status: false, message: error.message });
  }
}
