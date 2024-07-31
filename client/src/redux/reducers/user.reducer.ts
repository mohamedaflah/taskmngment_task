import { UserReducerIntital } from "@/types/user.reducer.type";
import { createSlice } from "@reduxjs/toolkit";
import {
  getUserAction,
  userLoginAction,
  userlogoutAction,
  userSignupAction,
} from "../actions/user/user.action";
import toast from "react-hot-toast";

const initialState: UserReducerIntital = {
  loading: false,
  user: null,
  error: false,
};

const userReducer = createSlice({
  reducers: {},
  initialState,
  name: "userreducer",
  extraReducers: (builder) => {
    builder
      .addCase(userSignupAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(userSignupAction.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.loading = false;
        state.error = false;
        toast.success("Registration successful")
      })
      .addCase(userSignupAction.rejected, (state, { payload }) => {
        state.error = String(payload);
        state.loading = false;
        toast.error(state.error);
      })
      .addCase(getUserAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserAction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = false;
        state.user = payload.user;
      })
      .addCase(getUserAction.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = String(payload);
      })
      .addCase(userlogoutAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(userlogoutAction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload.user || null;
        state.error = false;
        toast.success("Logout successful")
      })
      .addCase(userlogoutAction.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = String(payload);
        toast.error(state.error);
      })
      .addCase(userLoginAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(userLoginAction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload.user;
        toast.success("Sign in successful")
      })
      .addCase(userLoginAction.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = String(payload);
        toast.error(state.error);
      });
  },
});

export default userReducer.reducer;
