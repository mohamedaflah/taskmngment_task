import { axiosInstance } from "@/constants/axios";
import { handleErrors } from "@/lib/handleError";
import { loginSchema } from "@/lib/Schema/Login.schema";
import { signupFormSchema } from "@/lib/Schema/Signup.schema";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { z } from "zod";

export const userSignupAction = createAsyncThunk(
  "user/signup",
  async (userData: z.infer<typeof signupFormSchema>, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/api/user/user", userData);
      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const getUserAction = createAsyncThunk(
  "user/getuser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/api/user/user`);
      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const userlogoutAction = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete(`/api/user/user`);
      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const userLoginAction = createAsyncThunk(
  "user/login",
  async (userData: z.infer<typeof loginSchema>, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/api/user/login", userData);
      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);
