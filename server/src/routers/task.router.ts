import { Router } from "express";

import { addTodoController } from "../controllers/todo/addTodo.controller";
import { getTaskController } from "../controllers/todo/getTasks.controller";
import { addTaskController } from "../controllers/todo/addTask.controller";

const taskRouter = Router();

taskRouter.route("/todo").post(addTodoController).get(getTaskController);
taskRouter.route("/task").post(addTaskController);
export default taskRouter;
