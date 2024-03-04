import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";

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
  },
});

export default movieSlice.reducer;
