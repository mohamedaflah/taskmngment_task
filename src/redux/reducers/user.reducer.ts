import { UserReducerIntital } from "@/types/user.reducer.type";
import { createSlice } from "@reduxjs/toolkit";
import {
  getUserAction,
  userlogoutAction,
  userSignupAction,
} from "../actions/user/user.action";

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
      })
      .addCase(userSignupAction.rejected, (state, { payload }) => {
        state.error = String(payload);
        state.loading = false;
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
      })
      .addCase(userlogoutAction.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = String(payload);
      });
  },
});

export default userReducer.reducer;
