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
