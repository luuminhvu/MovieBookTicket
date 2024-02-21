import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../utils/api";
import { jwtDecode } from "jwt-decode";
import { setLocalStorage, removeLocalStorage } from "../services/datastore";
const initialState = {
  token: localStorage.getItem("token") || null,
  username: "",
  email: "",
  role: "",
  registerStatus: "",
  loginStatus: "",
  registerError: "",
  loginError: "",
};

export const register = createAsyncThunk(
  "auth/register",
  async (values, { rejectWithValue }) => {
    try {
      const response = await api.post("/user/register", values);
      console.log(response);
      setLocalStorage("token", response.data.data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loadingUserLogin(state, action) {
      const token = state.token;
      if (token) {
        const user = jwtDecode(token);
        return {
          ...state,
          username: user.username,
          email: user.email,
          role: user.role,
          loginStatus: "success",
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.fulfilled, (state, action) => {
      const user = jwtDecode(action.payload);
      if (action.payload) {
        return {
          ...state,
          token: action.payload,
          username: user.username,
          email: user.email,
          role: user.role,
          registerStatus: "success",
          registerError: "",
        };
      } else {
        return state;
      }
    });
    builder.addCase(register.rejected, (state, action) => {
      state.registerError = action.payload;
      state.registerStatus = "failed";
    });
  },
});
export default authSlice.reducer;
export const { loadingUserLogin } = authSlice.actions;
