import { Router } from "express";

import { addTodoController } from "../controllers/todo/addTodo.controller";
import { getTaskController } from "../controllers/todo/getTasks.controller";
import { addTaskController } from "../controllers/todo/addTask.controller";
import { updateTodController } from "../controllers/todo/update.todo.controller";
import { getStatus } from "../controllers/todo/getStatus";

const taskRouter = Router();

taskRouter
  .route("/todo")
  .post(addTodoController)
  .get(getTaskController)
  .put(updateTodController);
taskRouter.route("/task").post(addTaskController);
taskRouter.get("/status", getStatus);
export default taskRouter;
