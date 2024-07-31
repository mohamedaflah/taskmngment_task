import todoSchema from "../../models/todo.model";

export async function addTodo(title: string) {
  try {
    const newTask = new todoSchema({ title: title, tasks: [] });
    await newTask.save();
    return newTask;
  } catch (error) {
    console.error("Error adding todo:", error);
    throw new Error("Failed to add todo");
  }
}
