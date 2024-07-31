import { Request, Response } from "express";
import todoModel from "../../models/todo.model";

export async function getTaskController(req: Request, res: Response) {
  try {
    const todos = await todoModel.find();
    return res.status(200).json({ status: true, message: "Success", todos });
  } catch (error) {
    res.status(500).send({ message: "Internal server error", status: false });
  }
}
