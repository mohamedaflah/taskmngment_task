import { Request, Response } from "express";
import todoSchema from "../../models/todo.model";

export async function updateTodController(req: Request, res: Response) {
  const { sourceColumnId, targetColumnId, taskId, sourceIndex, targetIndex } =
    req.body;

  try {
    // Find source and target columns
    const sourceColumn = await todoSchema.findById(sourceColumnId);
    const targetColumn =
      sourceColumnId === targetColumnId
        ? sourceColumn
        : await todoSchema.findById(targetColumnId);

    if (!sourceColumn || !targetColumn) {
      return res.status(404).send({ message: "Column not found" });
    }

    // Reorder or move the task
    const taskToMove = sourceColumn.tasks.id(taskId);
    if (!taskToMove) {
      return res.status(404).send({ message: "Task not found" });
    }

    // Remove the task from the source column
    sourceColumn.tasks.pull(taskId);

    // Add the task to the target column at the specified index
    if (sourceColumnId === targetColumnId) {
      sourceColumn.tasks.splice(targetIndex, 0, taskToMove);
    } else {
      targetColumn.tasks.splice(targetIndex, 0, taskToMove);
    }

    // Save the changes
    await sourceColumn.save();
    if (sourceColumnId !== targetColumnId) {
      await targetColumn.save();
    }

    res.status(200).send({ message: "Task order updated successfully" });
  } catch (error) {
    console.error("Error updating task order:", error);
    res.status(500).send({ message: "Internal server error" });
  }
}
