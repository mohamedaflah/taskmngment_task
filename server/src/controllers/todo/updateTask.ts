import { Request, Response } from "express";
import todoModel from "../../models/todo.model";

export async function updateTaskController(req: Request, res: Response) {
  try {
    const { todoId, taskId, data } = req.body;
    await todoModel.updateOne(
      { _id: todoId, "tasks._id": taskId },
      {
        $set: {
          "tasks.$": data,
        },
      }
    );
    return res.status(200).json({ status: true, message: "Updated" });
  } catch (error) {
    return res
      .status(200)
      .json({ status: false, message: (error as any).message });
  }
}
