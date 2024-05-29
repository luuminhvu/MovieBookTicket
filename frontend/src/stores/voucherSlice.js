import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";
import { toast } from "react-toastify";

const initialState = {
  vouchers: [],
  userVoucher: [],
  status: null,
};
export const fetchVouchers = createAsyncThunk(
  "vouchers/fetchVouchers",
  async () => {
    try {
      const response = await api.get("/voucher");
      return response.data.data;
    } catch (error) {
      return error.response.data;
    }
  }
);
export const fetchUserVouchers = createAsyncThunk(
  "vouchers/fetchUserVouchers",
  async (id) => {
    try {
      const response = await api.get(`/voucher/${id}`);
      return response.data.data;
    } catch (error) {
      return error.response.data;
    }
  }
);
export const addVoucher = createAsyncThunk(
  "vouchers/addVoucher",
  async (voucher) => {
    try {
      const response = await api.post("/voucher/add", voucher);
      toast.success(response.data.message);
      return response.data.data;
    } catch (error) {
      return error.response.data;
    }
  }
);
export const editVoucher = createAsyncThunk(
  "vouchers/editVoucher",
  async (id, voucher) => {
    try {
      const response = await api.put(`/voucher/${id}`, voucher);
      toast.success(response.data.message);
      return response.data.data;
    } catch (error) {
      return error.response.data;
    }
  }
);
export const deleteVoucher = createAsyncThunk(
  "vouchers/deleteVoucher",
  async (id) => {
    try {
      const response = await api.delete(`/voucher/${id}`);
      toast.success(response.data.message);
      return response.data.data;
    } catch (error) {
      return error.response.data;
    }
  }
);
const voucherSlice = createSlice({
  initialState,
  name: "vouchers",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchVouchers.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchVouchers.fulfilled, (state, action) => {
      state.status = "success";
      state.vouchers = action.payload;
    });
    builder.addCase(fetchVouchers.rejected, (state) => {
      state.status = "failed";
    });
    builder.addCase(fetchUserVouchers.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchUserVouchers.fulfilled, (state, action) => {
      state.status = "success";
      state.userVoucher = action.payload;
    });
    builder.addCase(fetchUserVouchers.rejected, (state) => {
      state.status = "failed";
    });

    builder.addCase(addVoucher.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(addVoucher.fulfilled, (state, action) => {
      state.status = "success";
      state.vouchers.push(action.payload);
    });
    builder.addCase(addVoucher.rejected, (state) => {
      state.status = "failed";
    });
    builder.addCase(editVoucher.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(editVoucher.fulfilled, (state, action) => {
      state.status = "success";
      state.vouchers = state.vouchers.map((voucher) =>
        voucher.VoucherID === action.payload.VoucherID
          ? action.payload
          : voucher
      );
    });
    builder.addCase(editVoucher.rejected, (state) => {
      state.status = "failed";
    });
    builder.addCase(deleteVoucher.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(deleteVoucher.fulfilled, (state, action) => {
      state.status = "success";
      state.vouchers = state.vouchers.filter(
        (voucher) => voucher.VoucherID !== action.payload.VoucherID
      );
    });
    builder.addCase(deleteVoucher.rejected, (state) => {
      state.status = "failed";
    });
  },
});
export default voucherSlice.reducer;
