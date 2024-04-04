import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";
import { toast } from "react-toastify";

const initialState = {
  timeframes: [],
  status: null,
};
export const fetchTimeframes = createAsyncThunk(
  "timeframes/fetchTimeframes",
  async () => {
    try {
      const response = await api.get("/timeframe");
      return response.data.data;
    } catch (error) {
      return error.response.data;
    }
  }
);
export const addTimeframe = createAsyncThunk(
  "timeframes/addTimeframe",
  async (timeframe) => {
    try {
      const response = await api.post("/timeframe/add", timeframe);
      toast.success(response.data.message);
      return response.data.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

const timeframeSlice = createSlice({
  name: "timeframes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTimeframes.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchTimeframes.fulfilled, (state, action) => {
      state.status = "success";
      state.timeframes = action.payload;
    });
    builder.addCase(fetchTimeframes.rejected, (state) => {
      state.status = "failed";
    });
    builder.addCase(addTimeframe.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(addTimeframe.fulfilled, (state, action) => {
      state.status = "success";
      console.log(action.payload);
      state.timeframes.push(action.payload);
    });
    builder.addCase(addTimeframe.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export default timeframeSlice.reducer;
