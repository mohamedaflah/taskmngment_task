import { Request, Response } from "express";
import { addTask } from "../../services/todo/addTask.service";
import { addTodo } from "../../services/todo/addtodo.service";

export async function addTodoController(req: Request, res: Response) {
  try {
    const todo = await addTodo(req.body.title);
    return res.status(200).json({ status: true, message: "Good", todo });
  } catch (error) {
    console.error("Error adding task order:", error);
    res.status(500).send({ message: "Internal server error", status: false });
  }
}
