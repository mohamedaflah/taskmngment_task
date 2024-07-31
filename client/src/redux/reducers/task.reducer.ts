import { TaskReducerIntital } from "@/types/task.reducer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getTodos } from "../actions/todo/todo.action";
import toast from "react-hot-toast";

const initialState: TaskReducerIntital = {
  loading: false,
  error: false,
  status: null,
  task: null,
  // [
  //   {
  //     _id: "aslkdfdjalksfd",
  //     title: "Todo",
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //     tasks: [
  //       {
  //         _id: "8754",
  //         createdAt: new Date(),
  //         description: "this it test description",
  //         priority: "urgent",
  //         title: "Implement usasfder interface",
  //       },
  //       {
  //         _id: "456",
  //         createdAt: new Date(),
  //         description: "this it test description",
  //         priority: "low",
  //         title: "Implement user",
  //       },
  //       {
  //         _id: "543",
  //         createdAt: new Date(),
  //         description: "this it test description",
  //         priority: "medium",
  //         title: "Implement asdfuser",
  //       },
  //     ],
  //   },
  //   {
  //     _id: "biolambobanbdolid",
  //     title: "In progress",
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //     tasks: [
  //       {
  //         _id: "9034",
  //         createdAt: new Date(),
  //         description: "this it test description",
  //         priority: "urgent",
  //         title: "Implemeasdfasfdser interface",
  //       },
  //       {
  //         _id: "12",
  //         createdAt: new Date(),
  //         description: "this it test description",
  //         priority: "low",
  //         title: "Implement asfduser",
  //       },
  //     ],
  //   },
  // ],
};

const taskReducer = createSlice({
  initialState,
  name: "task-reducer",
  extraReducers: (builder) => {
    builder
      .addCase(getTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTodos.fulfilled, (state, { payload }) => {
        state.task = payload.todos;
      })
      .addCase(getTodos.rejected, (state, { payload }) => {
        state.error = String(payload);
        state.loading = false;
        toast.error(state.error);
      });
  },
  reducers: {
    updateTaskState(state, action: PayloadAction<TaskReducerIntital>) {
      state.task = action.payload.task;
    },
    handleTaskDrop(
      state,
      action: PayloadAction<{
        sourceColumnId: string;
        targetColumnId: string;
        taskId: string;
        sourceIndex: number;
        targetIndex: number;
      }>
    ) {
      const {
        sourceColumnId,
        targetColumnId,
        taskId,
        sourceIndex,
        targetIndex,
      } = action.payload;

      const sourceColumn = state.task?.find(
        (col) => col._id === sourceColumnId
      );
      const targetColumn = state.task?.find(
        (col) => col._id === targetColumnId
      );

      if (sourceColumn && targetColumn) {
        if (sourceColumnId === targetColumnId) {
          // Reorder tasks within the same column
          const [movedTask] = sourceColumn.tasks.splice(sourceIndex, 1);
          sourceColumn.tasks.splice(targetIndex, 0, movedTask);
        } else {
          // Move task from source column to target column
          const [movedTask] = sourceColumn.tasks.splice(sourceIndex, 1);
          targetColumn.tasks.splice(targetIndex, 0, movedTask);
        }
      }
    },
  },
});

export const { updateTaskState, handleTaskDrop } = taskReducer.actions;
export default taskReducer.reducer;
