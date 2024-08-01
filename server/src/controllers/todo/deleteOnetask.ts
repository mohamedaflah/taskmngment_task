import { Request, Response } from "express";
import todoModel from "../../models/todo.model";

export async function deleteTaskwithTaskId(req: Request, res: Response) {
  try {
    const { todoId, taskId } = req.query;
    await todoModel.updateOne(
      { _id: todoId },
      { $pull: { tasks: { _id: taskId } } }
    );
    return res.status(200).json({ status: true, message: "deletion done" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: (error as any).message });
  }
}
