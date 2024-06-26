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
export const editTimeFrame = createAsyncThunk(
  "timeframes/editTimeFrame",
  async (timeframe) => {
    try {
      const response = await api.put("/timeframe/edit", timeframe);
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
      state.timeframes.push(action.payload);
    });
    builder.addCase(addTimeframe.rejected, (state) => {
      state.status = "failed";
    });
    builder.addCase(editTimeFrame.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(editTimeFrame.fulfilled, (state, action) => {
      state.status = "success";
      const index = state.timeframes.findIndex(
        (timeframe) => timeframe.TimeFrameID === action.payload.TimeFrameID
      );
      state.timeframes[index] = action.payload;
    });
    builder.addCase(editTimeFrame.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export default timeframeSlice.reducer;
