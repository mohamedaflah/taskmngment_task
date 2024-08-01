import { Request, Response } from "express";
import { decodeToken } from "../../lib/decodeToken";
import { getUser } from "../../services/getuser.service";

export async function getUserController(req: Request, res: Response) {
  try {
    const token = req.cookies["taskmanagementauthtoken"];
    if (!token)
      return res
        .status(401)
        .json({ user: null, status: false, message: "Unautherized" });
    const { id } = decodeToken(token) as any;
    const user = await getUser(id);
    return res
      .status(200)
      .json({ status: false, user, message: "Successfull" });
  } catch (error: any | Error) {
    return res.status(500).json({ status: false, message: error.message });
  }
}
