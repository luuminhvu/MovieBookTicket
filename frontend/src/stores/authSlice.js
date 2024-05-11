import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../utils/api";
import { jwtDecode } from "jwt-decode";
import { setLocalStorage, removeLocalStorage } from "../services/datastore";
import { showToast } from "../components/common/Toast";
const initialState = {
  token: localStorage.getItem("token") || null,
  userId: "",
  username: "",
  email: "",
  role: "",
  authType: "",
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
      setLocalStorage("token", response.data.data, 7200);
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
      setLocalStorage("token", response.data.data, 7200);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const loginGoogle = createAsyncThunk(
  "auth/loginGoogle",
  async (values, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/verify-google", {
        token: values.credential,
      });
      setLocalStorage("token", res.data.data.token);
      showToast(res.data.message, res.data.status);
    } catch (error) {
      showToast(error.response.data.message, error.response.data.status);
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
          userId: user.userId,
          username: user.username,
          email: user.email,
          role: user.role,
          loginStatus: "success",
          authType: user.authType,
        };
      } else {
        return state;
      }
    },
    logout(state) {
      removeLocalStorage("token");
      return {
        ...state,
        token: null,
        userId: "",
        username: "",
        email: "",
        role: "",
        authType: "",
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
          userId: user.userId,
          username: user.username,
          email: user.email,
          role: user.role,
          authType: user.authType,
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
          userId: user.userId,
          username: user.username,
          email: user.email,
          role: user.role,
          authType: user.authType,
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
    builder.addCase(loginGoogle.fulfilled, (state, action) => {
      const user = action.payload
        ? jwtDecode(action.payload)
        : { userId: "", username: "", email: "", role: "" };
      return {
        ...state,
        token: action.payload,
        userId: user.userId,
        username: user.username,
        email: user.email,
        role: user.role,
        authType: user.authType,
        loginStatus: "success",
        loginError: "",
      };
    });
    builder.addCase(loginGoogle.rejected, (state, action) => {
      state.loginError = action.payload;
      state.loginStatus = "failed";
    });
    builder.addCase(loginGoogle.pending, (state, action) => {
      state.loginStatus = "loading";
    });
  },
});
export default authSlice.reducer;
export const { loadingUserLogin, logout } = authSlice.actions;
