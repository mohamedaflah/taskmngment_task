import { UserReducerIntital } from "@/types/user.reducer.type";
import { createSlice } from "@reduxjs/toolkit";

const initialState: UserReducerIntital = {
  loading: false,
  user: null,
  error: false,
};

const userReducer = createSlice({
  reducers: {},
  initialState,
  name: "userreducer",
});

export default userReducer.reducer;
