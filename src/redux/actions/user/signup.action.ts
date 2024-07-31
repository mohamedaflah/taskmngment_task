import { handleErrors } from "@/lib/handleError";
import { signupFormSchema } from "@/lib/Schema/Signup.schema";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { z } from "zod";

export const userSignupAction = createAsyncThunk(
  "user/signup",
  (userData: z.infer<typeof signupFormSchema>, { rejectWithValue }) => {
    try {
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);
