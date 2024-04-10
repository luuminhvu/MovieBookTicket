import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";
import { toast } from "react-toastify";

const initialState = {
  movies: [],
  status: null,
  createStatus: null,
  editStatus: null,
  deleteStatus: null,
};
export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const response = await api.get("/movie");
        resolve(response.data.data);
      } catch (error) {
        reject(error);
      }
    }, 2000); // Giả sử bạn muốn lấy dữ liệu sau 2 giây
  });
});
export const addMovie = createAsyncThunk("movies/addMovie", async (movie) => {
  try {
    const response = await api.post("/movie/add", movie);
    toast.success(response.data.message);
    return response.data.data;
  } catch (error) {
    return error.response.data;
  }
});
export const editMovie = createAsyncThunk("movies/editMovie", async (movie) => {
  try {
    const response = await api.put("/movie/edit", movie);
    toast.success(response.data.message);
    return response.data.data;
  } catch (error) {
    return error.response.data;
  }
});

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.status = "success";
      state.movies = action.payload;
    });
    builder.addCase(fetchMovies.rejected, (state) => {
      state.status = "failed";
    });
    builder.addCase(addMovie.pending, (state) => {
      state.createStatus = "loading";
    });
    builder.addCase(addMovie.fulfilled, (state, action) => {
      state.createStatus = "success";
      state.movies.push(action.payload);
    });
    builder.addCase(addMovie.rejected, (state) => {
      state.createStatus = "failed";
    });
    builder.addCase(editMovie.pending, (state) => {
      state.editStatus = "loading";
    });
    builder.addCase(editMovie.fulfilled, (state, action) => {
      state.editStatus = "success";
      state.movies = state.movies.map((movie) =>
        movie.MovieID === action.payload.MovieID ? action.payload : movie
      );
    });
    builder.addCase(editMovie.rejected, (state) => {
      state.editStatus = "failed";
    });
  },
});

export default movieSlice.reducer;
