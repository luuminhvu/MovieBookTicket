import { toast } from "react-toastify";
import api from "../utils/api";

export const getDetailMovie = async (id) => {
  try {
    const response = await api.get(`/movie/${id}`);
    return response.data.data;
  } catch (error) {
    toast.error(error.message);
  }
};
export const getShowTimeMovie = async (id, date) => {
  try {
    const response = await api.post(`/ticket`, { MovieID: id, date: date });
    return response.data.data;
  } catch (error) {
    toast.error(error.message);
  }
};
export const getUserInfo = async (UserID) => {
  try {
    const response = await api.post(`/user/profile`, { UserID });
    return response.data.data;
  } catch (error) {
    toast.error(error.message);
  }
};
export const updateUser = async (user, id) => {
  try {
    return await api.put(`/user/profile`, { id, user });
  } catch (error) {
    toast.error(error.message);
  }
};
export const updateUserPassword = async (user, id) => {
  try {
    const res = await api.post(`/user/profile/updatepassword`, { id, user });
    return res;
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data.message;
      toast.error(errorMessage);
    } else {
      console.error(error);
    }
  }
};

export const updateAvatar = async (avatar, id) => {
  try {
    const res = await api.put(`/user/profile/updateavatar`, { id, avatar });
    return res;
  } catch (error) {
    toast.error(error.message);
  }
};
export const getUser = async () => {
  try {
    const res = await api.get(`/user`);
    return res.data.data;
  } catch (error) {
    toast.error(error.message);
  }
};
export const updateUserForAdmin = async (values) => {
  try {
    const res = await api.put(`/user`, values);
    toast.success("Cập nhật thành công");
    return res.data.data;
  } catch (error) {
    toast.error(error.message);
  }
};
export const getAllOrderForAdmin = async () => {
  try {
    const res = await api.get(`/order/all`);
    return res.data.data;
  } catch (error) {
    toast.error(error.message);
  }
};
export const getRevenueAndTicketsByDay = async () => {
  try {
    const res = await api.get(`/statistical/revenue-by-day`);
    return res.data.data;
  } catch (error) {
    toast.error(error.message);
  }
};
export const getRevenueByDayOfMonth = async (year, month) => {
  try {
    const res = await api.post(`/statistical/revenue-by-month`, {
      year,
      month,
    });
    return res.data.data;
  } catch (error) {
    toast.error(error.message);
  }
};
export const getTopMoviesByRevenue = async () => {
  try {
    const res = await api.get(`/statistical/top-movies-by-revenue`);
    return res.data.data;
  } catch (error) {
    toast.error(error.message);
  }
};
export const getTopGenresByRevenue = async () => {
  try {
    const res = await api.get(`/statistical/top-genres-by-revenue`);
    return res.data.data;
  } catch (error) {
    toast.error(error.message);
  }
};
export const getTopTimeFramesByRevenue = async () => {
  try {
    const res = await api.get(`/statistical/top-timeframes-by-revenue`);
    return res.data.data;
  } catch (error) {
    toast.error(error.message);
  }
};
