import { Request, Response } from "express";
import { createUser } from "../../services/createuser.service";
import {} from "util";
import { generateJWT } from "../../lib/generateToken";
export async function signupUserController(req: Request, res: Response) {
  try {
    const user = await createUser(req.body);
    const tkn = generateJWT({ id: user._id });
    res.cookie("taskmanagementauthtoken", tkn);
    return res.status(201).json({ status: true, user, message: "Successfull" });
  } catch (error: Error | any) {
    return res.status(500).json({ status: false, message: error.message });
  }
}
