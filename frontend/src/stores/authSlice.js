import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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
export const login = createAsyncThunk(
  "auth/login",
  async (values, { rejectWithValue }) => {
    try {
      const response = await api.post("/user/login", values);
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
    logout(state) {
      removeLocalStorage("token");
      return {
        ...state,
        token: null,
        username: "",
        email: "",
        role: "",
        loginError: "",
        loginStatus: "",
        registerError: "",
        registerStatus: "",
      };
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
    builder.addCase(login.fulfilled, (state, action) => {
      const user = jwtDecode(action.payload);
      if (action.payload) {
        return {
          ...state,
          token: action.payload,
          username: user.username,
          email: user.email,
          role: user.role,
          loginStatus: "success",
          loginError: "",
        };
      } else {
        return state;
      }
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loginError = action.payload;
      state.loginStatus = "failed";
    });
    builder.addCase(login.pending, (state, action) => {
      state.loginStatus = "loading";
    });
  },
});
export default authSlice.reducer;
export const { loadingUserLogin, logout } = authSlice.actions;