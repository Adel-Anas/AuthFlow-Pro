import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllUsers = createAsyncThunk(
  "auth/getAllUsers",
  async () => {
    const res = await axios.get("http://localhost:4005/users/getUsers");
    return res.data;
  }
);

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    user: null,
    error: null,
    isLoading: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Reset error on pending
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default AuthSlice.reducer;
