import { Request, Response } from "express";
import todoModel from "../../models/todo.model";

interface UpdateTaskRequest extends Request {
  body: {
    todoId: string;
    taskId: string;
    data: Record<string, any>;
  };
}

export async function updateTaskController(
  req: UpdateTaskRequest,
  res: Response
) {
  try {
    const { todoId, taskId, data } = req.body;
    delete data.deadline;

    console.log("🚀 ~ updateTaskController ~ data:", data);
    console.log("🚀 ~ updateTaskController ~ taskId:", taskId);
    console.log("🚀 ~ updateTaskController ~ todoId:", todoId);

    const updateFields: Record<string, any> = {};
    for (const key in data) {
      updateFields[`tasks.$.${key}`] = data[key];
    }

    const response=await todoModel.updateOne(
      { _id: todoId, "tasks._id": taskId },
      { $set: updateFields }
    );
    console.log("🚀 ~ response:", response)

    return res.status(200).json({ status: true, message: "Updated" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: (error as any).message });
  }
}
