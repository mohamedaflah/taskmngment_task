import { TaskReducerIntital, Tasks } from "@/types/task.reducer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addTask,
  addTodoTitle,
  deleteFullTodo,
  deleteTaskCard,
  getTodos,
  updateTask,
  updateTodoTitle,
} from "../actions/todo/todo.action";
import toast from "react-hot-toast";

const initialState: TaskReducerIntital = {
  loading: false,
  error: false,
  status: null,
  task: null,
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
        state.loading = false;
      })
      .addCase(getTodos.rejected, (state, { payload }) => {
        state.error = String(payload);
        state.loading = false;
        toast.error(state.error);
      })
      .addCase(addTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTask.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.task = state?.task?.map((t) => {
          if (t._id == payload.todoId) {
            return payload.todo;
          } else {
            return t;
          }
        }) as Tasks[] | null;
      })
      .addCase(addTask.rejected, (state, { payload }) => {
        state.error = String(payload);
        state.loading = false;
      })
      .addCase(addTodoTitle.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTodoTitle.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.task?.push(payload.todo);
      })
      .addCase(addTodoTitle.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = String(payload);
        toast.error(state.error);
      })
      .addCase(updateTodoTitle.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTodoTitle.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.task = state.task?.map((t) => {
          if (t._id == payload.todoId) {
            return { ...t, title: payload.title };
          } else {
            return t;
          }
        }) as Tasks[];
        state.error = false;
      })
      .addCase(updateTodoTitle.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = String(payload);
      })
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTask.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.task = state.task?.map((t) => {
          if (t._id === payload._id) {
            return {
              ...t,
              tasks: t.tasks?.map((v) => {
                if (v._id === payload.taskId) {
                  return payload.data;
                } else {
                  return v;
                }
              }),
            };
          } else {
            return t;
          }
        }) as Tasks[];
        state.error = false;
      })
      .addCase(updateTask.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = String(payload);
      })
      .addCase(deleteFullTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteFullTodo.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.task = state.task?.filter(
          (t) => t._id !== payload.todoId
        ) as Tasks[];
      })
      .addCase(deleteFullTodo.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = String(payload);
      })
      .addCase(deleteTaskCard.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTaskCard.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.task = state.task?.map((t) => {
          if (t._id == payload.todoId) {
            return {
              ...t,
              tasks: t.tasks.filter((v) => v._id !== payload.taskId),
            };
          } else {
            return t;
          }
        }) as Tasks[];
      })
      .addCase(deleteTaskCard.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = String(payload);
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
