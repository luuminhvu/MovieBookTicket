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
  active: "",
};

export const register = createAsyncThunk(
  "auth/register",
  async (values, { rejectWithValue }) => {
    try {
      const response = await api.post("/user/register", values);
      setLocalStorage("token", response.data.data, 7200);
      showToast(response.data.message, response.data.status);
      return response.data.data;
    } catch (error) {
      showToast(error.response.data.message, error.response.data.status);
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
      showToast(response.data.message, response.data.status);
      return response.data.data;
    } catch (error) {
      showToast(error.response.data.message, error.response.data.status);
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
export const checkActive = createAsyncThunk(
  "auth/checkActive",
  async (values, { rejectWithValue }) => {
    try {
      const response = await api.post("/user/checkactive", {
        UserID: values,
      });
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
          userId: user.userId,
          username: user.username,
          email: user.email,
          role: user.role,
          loginStatus: "success",
          authType: user.authType,
          active: user.active,
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
        active: "",
      };
    },
    checkExpiredToken(state) {
      const token = state.token;
      if (token) {
        const user = jwtDecode(token);
        const exp = user.exp;
        const currentTime = Math.floor(Date.now() / 1000);

        if (exp < currentTime) {
          removeLocalStorage("token");
          showToast(
            "Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại",
            "error"
          );
          return {
            ...state,
            token: null,
            userId: "",
            username: "",
            email: "",
            role: "",
            authType: "",
            loginError: "",
            loginStatus: "expired",
            registerError: "",
            registerStatus: "",
            active: "",
          };
        }
      }
      return state;
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
          active: user.active,
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
          active: user.active,
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
        active: user.active,
      };
    });
    builder.addCase(loginGoogle.rejected, (state, action) => {
      state.loginError = action.payload;
      state.loginStatus = "failed";
    });
    builder.addCase(loginGoogle.pending, (state, action) => {
      state.loginStatus = "loading";
    });
    builder.addCase(checkActive.fulfilled, (state, action) => {
      return {
        ...state,
        active: action.payload.activeStatus,
      };
    });
    builder.addCase(checkActive.rejected, (state, action) => {
      state.loginError = action.payload;
      state.loginStatus = "failed";
    });
    builder.addCase(checkActive.pending, (state, action) => {
      state.loginStatus = "loading";
    });
  },
});
export default authSlice.reducer;
export const { loadingUserLogin, logout, checkExpiredToken } =
  authSlice.actions;
