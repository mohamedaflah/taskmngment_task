import { Router } from "express";

import { addTodoController } from "../controllers/todo/addTodo.controller";
import { getTaskController } from "../controllers/todo/getTasks.controller";
import { addTaskController } from "../controllers/todo/addTask.controller";
import { updateTodController } from "../controllers/todo/update.todo.controller";
import { getStatus } from "../controllers/todo/getStatus";
import { updateTitle } from "../controllers/todo/updateTitl";
import { deletAllTask } from "../controllers/todo/deleteAlltask";
import { deleteTaskwithTaskId } from "../controllers/todo/deleteOnetask";
import { updateTaskController } from "../controllers/todo/updateTask";

const taskRouter = Router();

taskRouter
  .route("/todo")
  .post(addTodoController)
  .get(getTaskController)
  .put(updateTodController)
  .delete(deletAllTask);
taskRouter
  .route("/task")
  .post(addTaskController)
  .delete(deleteTaskwithTaskId)
  .put(updateTaskController);
taskRouter.route("/status").get(getStatus).patch(updateTitle);

export default taskRouter;


