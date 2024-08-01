import { Request, Response } from "express";
import todoModel from "../../models/todo.model";

export async function deletAllTask(req: Request, res: Response) {
  try {
    const { todoId } = req.query;
    await todoModel.deleteOne({ _id: todoId });
    return res
      .status(200)
      .json({ status: true, message: "Successful", todoId });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: (error as any).message });
  }
}
