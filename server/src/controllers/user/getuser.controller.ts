import { Request, Response } from "express";
import { decodeToken } from "../../lib/decodeToken";

export async function getUserController(req: Request, res: Response) {
  try {
    const token = req.cookies["taskmanagementauthtoken"];
    if (!token)
      return res
        .status(401)
        .json({ user: null, status: false, message: "Unautherized" });
    const {} = decodeToken(token);
  } catch (error: any | Error) {
    return res.status(500).json({ status: false, message: error.message });
  }
}
