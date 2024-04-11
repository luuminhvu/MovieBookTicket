import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";

const initialState = {
  Cinema: [],
  CinemaHall: [],
  CinemaHallByCinemaId: [],
  status: null,
};
export const fetchCinema = createAsyncThunk("Cinema/fetchCinema", async () => {
  try {
    const response = await api.get("/cinema");
    return response.data.data;
  } catch (error) {
    return error.response.data;
  }
});
export const fetchCinemaHall = createAsyncThunk(
  "Cinema/fetchCinemaHall",
  async () => {
    try {
      const response = await api.get("/cinemaHall");
      return response.data.data;
    } catch (error) {
      return error.response.data;
    }
  }
);
export const fetchCinemaHallByCinemaId = createAsyncThunk(
  "Cinema/fetchCinemaHallByCinemaId",
  async (CinemaID) => {
    try {
      const response = await api.post("/cinema/cinemahall", { CinemaID });
      return response.data.data;
    } catch (error) {
      return error.response.data;
    }
  }
);
const cinemaSlice = createSlice({
  name: "Cinema",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCinema.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchCinema.fulfilled, (state, action) => {
      state.status = "success";
      state.Cinema = action.payload;
    });
    builder.addCase(fetchCinema.rejected, (state) => {
      state.status = "failed";
    });
    builder.addCase(fetchCinemaHall.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchCinemaHall.fulfilled, (state, action) => {
      state.status = "success";
      state.CinemaHall = action.payload;
    });
    builder.addCase(fetchCinemaHall.rejected, (state) => {
      state.status = "failed";
    });
    builder.addCase(fetchCinemaHallByCinemaId.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchCinemaHallByCinemaId.fulfilled, (state, action) => {
      state.status = "success";
      state.CinemaHallByCinemaId = action.payload;
    });
    builder.addCase(fetchCinemaHallByCinemaId.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export default cinemaSlice.reducer;
