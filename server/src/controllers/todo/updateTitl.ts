import { Request, Response } from "express";
import todoModel from "../../models/todo.model";

export const updateTitle = async (req: Request, res: Response) => {
  try {
    const { todoId, title } = req.body;
    await todoModel.updateOne({ _id: todoId }, { $set: { title: title } });
    return res.status(200).json({ status: true, message: "updated" });
  } catch (error) {
    return res.status(500).json({ status: false, message: "Successful" });
  }
};
