import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";

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
