import { Router, Request, Response } from "express";
export const validateSession = async (req: Request, res: Response) => {
  if (req.session && (req.session as any).userId) {
    return res.status(200).json({ valid: true });
  }
  return res.status(401).json({ valid: false });
};
