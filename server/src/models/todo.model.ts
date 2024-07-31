import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    priority: {
      type: String,
      enum: ["urgent", "medium", "low"],
    },
  },
  { timestamps: true }
);

const todoSchema = new mongoose.Schema(
  {
    title: String,
    tasks: [taskSchema], 
  },
  { timestamps: true }
);


export default mongoose.models["todo"] || mongoose.model("todo", todoSchema);
