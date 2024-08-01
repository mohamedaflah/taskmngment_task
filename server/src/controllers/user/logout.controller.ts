import { Request, Response } from "express";

export async function logoutController(req: Request, res: Response) {
  try {
    res.clearCookie("taskmanagementauthtoken");
    return res
      .status(201)
      .json({ status: true, user: null, message: "Successfull" });
  } catch (error: Error | any) {
    return res.status(500).json({ status: false, message: error.message });
  }
}
