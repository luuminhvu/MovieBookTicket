import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";
import { toast } from "react-toastify";

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
      const response = await api.get("/cinema/cinemahall");
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
export const addCinema = createAsyncThunk(
  "Cinema/addCinema",
  async (values) => {
    try {
      const response = await api.post("/cinema/add", values);
      toast.success(response.data.message);
      return response.data.data;
    } catch (error) {
      return error.response.data;
    }
  }
);
export const editCinema = createAsyncThunk(
  "Cinema/editCinema",
  async (values) => {
    try {
      const response = await api.put("/cinema/edit", values);
      toast.success(response.data.message);
      return response.data.data;
    } catch (error) {
      return error.response.data;
    }
  }
);
export const addCinemaHall = createAsyncThunk(
  "Cinema/addCinemaHall",
  async (values) => {
    try {
      const response = await api.post("/cinema/cinemahall/add", values);
      toast.success(response.data.message);
      return response.data.data;
    } catch (error) {
      return error.response.data;
    }
  }
);
export const editCinemaHall = createAsyncThunk(
  "Cinema/editCinemaHall",
  async (values) => {
    try {
      const response = await api.put("/cinema/cinemahall/edit", values);
      toast.success(response.data.message);
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
    builder.addCase(addCinema.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(addCinema.fulfilled, (state, action) => {
      state.status = "success";
      state.Cinema.push(action.payload);
    });
    builder.addCase(addCinema.rejected, (state) => {
      state.status = "failed";
    });
    builder.addCase(editCinema.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(editCinema.fulfilled, (state, action) => {
      state.status = "success";
      state.Cinema = state.Cinema.map((cinema) =>
        cinema.CinemaID === action.payload.CinemaID ? action.payload : cinema
      );
    });
    builder.addCase(editCinema.rejected, (state) => {
      state.status = "failed";
    });
    builder.addCase(addCinemaHall.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(addCinemaHall.fulfilled, (state, action) => {
      state.status = "success";
      state.CinemaHall.push(action.payload);
    });
    builder.addCase(addCinemaHall.rejected, (state) => {
      state.status = "failed";
    });
    builder.addCase(editCinemaHall.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(editCinemaHall.fulfilled, (state, action) => {
      state.status = "success";
      state.CinemaHall = state.CinemaHall.map((cinemaHall) =>
        cinemaHall.CinemaHallID === action.payload.CinemaHallID
          ? action.payload
          : cinemaHall
      );
    });
    builder.addCase(editCinemaHall.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export default cinemaSlice.reducer;
