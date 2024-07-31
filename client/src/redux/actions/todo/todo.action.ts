import { axiosInstance } from "@/constants/axios";
import { handleErrors } from "@/lib/handleError";
import { columnAddSchema } from "@/lib/Schema/columnadd.schema";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const addTodo = createAsyncThunk(
  "todo/add-todo",
  async (sendPayload: { title: string }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(`/api/todo/todo`, {
        title: sendPayload.title,
      });
      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const addTask = createAsyncThunk(
  "todo/add-task",
  async (
    sendPaylod: {
      todoId: string;
      task: {
        title: string;
        description: string;
        priority: string;
        deadline: string | Date;
      };
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axiosInstance.post(`/api/todo/task`, sendPaylod);
      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const getTodos = createAsyncThunk(
  "todo/get-todo",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/api/todo/todo`);
      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);
