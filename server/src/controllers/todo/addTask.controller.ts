import { Request, Response } from "express";
import { addTask } from "../../services/todo/addTask.service";

export async function addTaskController(req: Request, res: Response) {
  try {
    const todo = await addTask(req.body.task, req.body.todoId);
    return res.status(200).json({ status: true, message: "Success ", todo });
  } catch (error) {
    console.error("Error adding task order:", error);
    res.status(500).send({ message: "Internal server error", status: false });
  }
}
