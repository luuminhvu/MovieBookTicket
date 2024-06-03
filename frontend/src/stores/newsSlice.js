import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../utils/api";
import { showToast } from "../components/common/Toast";

const initialState = {
  news: [],
  newsStatus: "idle",
  newsError: "",
};

export const getNews = createAsyncThunk(
  "news/getNews",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/news");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getNewsById = createAsyncThunk(
  "news/getNewsById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/news/${id}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const addNews = createAsyncThunk(
  "news/addNews",
  async (values, { rejectWithValue }) => {
    try {
      const response = await api.post("/news", values);
      showToast(response.data.message, "success");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const updateNews = createAsyncThunk(
  "news/updateNews",
  async (values, { rejectWithValue }) => {
    try {
      const response = await api.put("/news", values);
      showToast(response.data.message, "success");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const deleteNews = createAsyncThunk(
  "news/deleteNews",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/news/${id}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    loadingNews(state, action) {
      state.newsStatus = "loading";
    },
    resetNews(state, action) {
      state.newsStatus = "idle";
      state.newsError = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getNews.pending, (state) => {
      state.newsStatus = "loading";
    });
    builder.addCase(getNews.fulfilled, (state, action) => {
      state.newsStatus = "success";
      state.news = action.payload;
    });
    builder.addCase(getNews.rejected, (state, action) => {
      state.newsStatus = "failed";
      state.newsError = action.payload;
    });
    builder.addCase(addNews.pending, (state) => {
      state.newsStatus = "loading";
    });
    builder.addCase(addNews.fulfilled, (state, action) => {
      state.newsStatus = "success";
      state.news.push(action.payload);
    });
    builder.addCase(addNews.rejected, (state, action) => {
      state.newsStatus = "failed";
      state.newsError = action.payload;
    });
    builder.addCase(updateNews.pending, (state) => {
      state.newsStatus = "loading";
    });
    builder.addCase(updateNews.fulfilled, (state, action) => {
      state.newsStatus = "success";
      state.news = state.news.map((news) =>
        news.NewsID === action.payload.NewsID ? action.payload : news
      );
    });
    builder.addCase(updateNews.rejected, (state, action) => {
      state.newsStatus = "failed";
      state.newsError = action.payload;
    });
    builder.addCase(deleteNews.pending, (state) => {
      state.newsStatus = "loading";
    });
    builder.addCase(deleteNews.fulfilled, (state, action) => {
      state.newsStatus = "success";
      state.news = state.news.filter((news) => news.NewsID !== action.payload);
    });
    builder.addCase(deleteNews.rejected, (state, action) => {
      state.newsStatus = "failed";
      state.newsError = action.payload;
    });
  },
});
export const { loadingNews, resetNews } = newsSlice.actions;
export default newsSlice.reducer;
