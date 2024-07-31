import todoSchema from "../../models/todo.model";

export async function addTask(task: any, todoId: string) {
  try {
    const todo = await todoSchema.findById(todoId);
    if (!todo) {
      throw new Error("Todo not found");
    }

    todo.tasks.push(task);
    await todo.save();
    return todo;
  } catch (error) {
    console.error("Error adding task:", error);
    throw error;
  }
}
