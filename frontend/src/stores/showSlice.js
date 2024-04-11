import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";
import { toast } from "react-toastify";

const initialState = {
  show: [],
  status: null,
};
export const fetchShow = createAsyncThunk("show/fetchShow", async () => {
  try {
    const response = await api.get("/showtime");
    return response.data.data;
  } catch (error) {
    return error.response.data;
  }
});
export const addShow = createAsyncThunk("show/addShow", async (show) => {
  try {
    const response = await api.post("/showtime/add", show);
    toast.success(response.data.message);
    return response.data.data;
  } catch (error) {
    return error.response.data;
  }
});
export const editShow = createAsyncThunk("show/editShow", async (show) => {
  try {
    const response = await api.put("/showtime/edit", show);
    toast.success(response.data.message);
    return response.data.data;
  } catch (error) {
    return error.response.data;
  }
});

const showSlice = createSlice({
  name: "show",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchShow.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchShow.fulfilled, (state, action) => {
      state.status = "success";
      state.show = action.payload;
    });
    builder.addCase(fetchShow.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export default showSlice.reducer;
