import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";
import { toast } from "react-toastify";

const initialState = {
  movies: [],
  status: null,
  poster: [],
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
    }, 1000);
  });
});
export const fetchPoster = createAsyncThunk("movies/fetchPoster", async () => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const response = await api.get("/poster");
        resolve(response.data.data);
      } catch (error) {
        reject(error);
      }
    }, 1000);
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
export const addPoster = createAsyncThunk(
  "movies/addPoster",
  async (poster) => {
    try {
      const response = await api.post("/poster/add", poster);
      toast.success(response.data.message);
      return response.data.data;
    } catch (error) {
      return error.response.data;
    }
  }
);
export const handleChangeActivePoster = createAsyncThunk(
  "movies/handleChangeActivePoster",
  async (poster) => {
    try {
      const response = await api.put("/poster/edit", poster);
      toast.success(response.data.message);
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const deletePoster = createAsyncThunk(
  "movies/deletePoster",
  async (poster) => {
    try {
      const response = await api.delete(`/poster/delete/${poster.PosterID}`);
      toast.success(response.data.message);
      return poster;
    } catch (error) {
      return error.response.data;
    }
  }
);

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
    builder.addCase(fetchPoster.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchPoster.fulfilled, (state, action) => {
      state.status = "success";
      state.poster = action.payload;
    });
    builder.addCase(fetchPoster.rejected, (state) => {
      state.status = "failed";
    });
    builder.addCase(deletePoster.pending, (state) => {
      state.deleteStatus = "loading";
    });
    builder.addCase(deletePoster.fulfilled, (state, action) => {
      console.log(action.payload);
      state.deleteStatus = "success";
      state.poster = state.poster.filter(
        (poster) => poster.PosterID !== action.payload.PosterID
      );
    });
    builder.addCase(deletePoster.rejected, (state) => {
      state.deleteStatus = "failed";
    });
    builder.addCase(handleChangeActivePoster.pending, (state) => {
      state.deleteStatus = "loading";
    });
    builder.addCase(handleChangeActivePoster.fulfilled, (state, action) => {
      state.deleteStatus = "success";
      state.poster = state.poster.map((poster) =>
        poster.PosterID === action.payload.PosterID ? action.payload : poster
      );
    });
    builder.addCase(handleChangeActivePoster.rejected, (state) => {
      state.deleteStatus = "failed";
    });
    builder.addCase(addPoster.pending, (state) => {
      state.createStatus = "loading";
    });
    builder.addCase(addPoster.fulfilled, (state, action) => {
      state.createStatus = "success";
      state.poster.push(action.payload);
    });
    builder.addCase(addPoster.rejected, (state) => {
      state.createStatus = "failed";
    });
  },
});

export default movieSlice.reducer;
