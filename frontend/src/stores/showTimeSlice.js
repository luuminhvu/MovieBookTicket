import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";
const initialState = {
  showtimes: [],
  allShowtimes: [],
  status: null,
};
export const fetchShowtimes = createAsyncThunk(
  "showtimes/fetchShowtimes",
  async (data) => {
    try {
      const response = await api.post("/ticket", data);
      return response.data.data;
    } catch (error) {
      return error.response.data;
    }
  }
);
export const fetchShowtimesAll = createAsyncThunk(
  "showtimes/fetchShowtimesAll",
  async (data) => {
    try {
      const response = await api.post("/ticket/all", data);
      return response.data.data;
    } catch (error) {
      return error.response.data;
    }
  }
);
const showtimeSlice = createSlice({
  name: "showtimes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchShowtimes.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchShowtimes.fulfilled, (state, action) => {
      state.status = "success";
      state.showtimes = action.payload;
    });
    builder.addCase(fetchShowtimes.rejected, (state) => {
      state.status = "failed";
    });
    builder.addCase(fetchShowtimesAll.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchShowtimesAll.fulfilled, (state, action) => {
      state.status = "success";
      state.allShowtimes = action.payload;
    });
    builder.addCase(fetchShowtimesAll.rejected, (state) => {
      state.status = "failed";
    });
  },
});
export default showtimeSlice.reducer;
