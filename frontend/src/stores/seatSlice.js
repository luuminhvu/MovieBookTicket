import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";
const initialState = {
  seats: [],
  status: null,
  seatOfCinemaHall: [],
};
export const fetchSeats = createAsyncThunk(
  "seats/fetchSeats",
  async ([ShowtimeID, CinemaHallID]) => {
    try {
      const response = await api.post("/ticket/seats", {
        ShowtimeID,
        CinemaHallID,
      });
      return response.data.data;
    } catch (error) {
      return error.response.data;
    }
  }
);
export const getSeatOfCinemaHall = createAsyncThunk(
  "seats/getSeatOfCinemaHall",
  async () => {
    try {
      const response = await api.get("/seat");
      return response.data.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

const seatSlice = createSlice({
  name: "seats",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSeats.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchSeats.fulfilled, (state, action) => {
      state.status = "success";
      state.seats = action.payload;
    });
    builder.addCase(fetchSeats.rejected, (state) => {
      state.status = "failed";
    });
    builder.addCase(getSeatOfCinemaHall.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getSeatOfCinemaHall.fulfilled, (state, action) => {
      state.status = "success";
      state.seatOfCinemaHall = action.payload;
    });
    builder.addCase(getSeatOfCinemaHall.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export default seatSlice.reducer;
