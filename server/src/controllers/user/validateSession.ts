import { Router, Request, Response } from "express";
export const validateSession = async (req: Request, res: Response) => {
  console.log("api calling");

  console.log(req.session);
  console.log(req.session);

  if (req.session && (req?.session as any)?.user?._id) {
    return res.status(200).json({ valid: true });
  }
  return res.status(401).json({ valid: false });
};
