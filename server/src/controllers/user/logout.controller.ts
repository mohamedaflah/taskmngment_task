import { Request, Response } from "express";

export async function logoutController(req: Request, res: Response) {
  try {
    // Destroy the session to log out the user
    req.session.destroy((err) => {
      if (err) {
        return res
          .status(500)
          .json({ status: false, message: "Failed to log out" });
      }

      // Clear any cookies associated with the session
      res.clearCookie("taskmanagementauthtoken");

      return res
        .status(200)
        .json({ status: true, user: null, message: "Successfully logged out" });
    });
  } catch (error: any | Error) {
    return res.status(500).json({ status: false, message: error.message });
  }
}
