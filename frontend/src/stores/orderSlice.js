import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";

const initialState = {
  orders: [],
  status: null,
};

export const fetchOrder = createAsyncThunk(
  "orders/fetchOrder",
  async (UserID) => {
    try {
      console.log(UserID);
      const response = await api.post("/order", { UserID });
      return response.data.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOrder.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchOrder.fulfilled, (state, action) => {
      state.status = "success";
      state.orders = action.payload;
    });
    builder.addCase(fetchOrder.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export default orderSlice.reducer;
