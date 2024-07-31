import { Request, Response } from "express";
import todoModel from "../../models/todo.model";

export async function getStatus(req: Request, res: Response) {
  try {
    const statuses = await todoModel.find({}, { _id: true, title: true });
    return res.status(200).json({ status: true, statuses, message: "Success" });
  } catch (error: any) {
    return res.status(500).json({ status: false, message: error.message });
  }
}
