import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../stores/loadingSlice";
import {
  fetchCinema,
  fetchCinemaHallByCinemaId,
} from "../../../stores/cinemaSlice";
import { fetchTimeframes } from "../../../stores/timeFrameSlice";
import { addShow } from "../../../stores/showSlice";

export default function ModalCreateSt({ setOpenModal }) {
  const dispatch = useDispatch();
  const cinema = useSelector((state) => state.cinema.Cinema);
  const movie = useSelector((state) => state.movie.movies);
  const cinemaHall = useSelector((state) => state.cinema.CinemaHallByCinemaId);
  const timeFrame = useSelector((state) => state.timeFrame.timeframes);
  const [selectedCinemaId, setSelectedCinemaId] = useState("");

  useEffect(() => {
    document.title = "Quản lí suất chiếu";
    const fetchData = async () => {
      dispatch(setLoading(true));
      dispatch(fetchCinema());
      dispatch(fetchTimeframes());
      dispatch(setLoading(false));
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (selectedCinemaId) {
      dispatch(fetchCinemaHallByCinemaId(selectedCinemaId));
    }
  }, [selectedCinemaId, dispatch]);

  const formik = useFormik({
    initialValues: {
      CinemaHallID: "",
      MovieID: "",
      TimeFrameID: "",
      Date: "",
    },
    validationSchema: Yup.object({
      MovieID: Yup.string().required("Vui lòng chọn phim"),
      CinemaHallID: Yup.string().required("Vui lòng chọn rạp chiếu"),
      TimeFrameID: Yup.string().required("Vui lòng chọn thời gian chiếu"),
      Date: Yup.string().required("Vui lòng chọn ngày chiếu"),
    }),
    onSubmit: async (values) => {
      try {
        dispatch(setLoading(true));
        await dispatch(addShow(values));
        dispatch(setLoading(false));
        setOpenModal(false);
      } catch (error) {
        console.error("Lỗi khi thêm mới suất chiếu:", error);
      }
    },
  });

  return (
    <>
      <div className="fixed inset-8 z-10 overflow-y-auto">
        <div
          className="fixed inset-0 w-full h-full bg-black opacity-40"
          onClick={() => setOpenModal(false)}
        ></div>
        <div className="flex items-center px-4 py-8">
          <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
            <div className="mt-3">
              <div className="flex items-center justify-center flex-none w-12 h-12 mx-auto bg-red-100 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-red-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="mt-2 text-center sm:ml-4 sm:text-left">
                <h4 className="text-lg font-medium text-gray-800 text-center">
                  Thêm mới suất chiếu
                </h4>
                <form onSubmit={formik.handleSubmit}>
                  <div className="mt-3 text-sm text-gray-600">
                    <label htmlFor="MovieID" className="block text-left">
                      Chọn phim
                    </label>
                    <select
                      id="MovieID"
                      name="MovieID"
                      value={formik.values.MovieID}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full p-2 mt-1 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-600"
                    >
                      <option value="">Chọn phim</option>
                      {movie.map((item) => (
                        <option key={item.MovieID} value={item.MovieID}>
                          {item.Name}
                        </option>
                      ))}
                    </select>
                    {formik.touched.MovieID && formik.errors.MovieID && (
                      <div className="text-red-500">
                        {formik.errors.MovieID}
                      </div>
                    )}
                  </div>
                  <div className="mt-3 text-sm text-gray-600">
                    <label htmlFor="CinemaID" className="block text-left">
                      Chọn rạp chiếu
                    </label>
                    <select
                      id="CinemaID"
                      name="CinemaID"
                      onChange={(e) => {
                        setSelectedCinemaId(e.target.value);
                      }}
                      className="w-full p-2 mt-1 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-600"
                    >
                      <option value="">Chọn rạp chiếu</option>
                      {cinema.map((item) => (
                        <option key={item.CinemaID} value={item.CinemaID}>
                          {item.Name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mt-3 text-sm text-gray-600">
                    <label htmlFor="CinemaHallID" className="block text-left">
                      Chọn phòng chiếu
                    </label>
                    <select
                      id="CinemaHallID"
                      name="CinemaHallID"
                      value={formik.values.CinemaHallID}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full p-2 mt-1 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-600"
                    >
                      <option value="">Chọn phòng chiếu</option>
                      {cinemaHall.map((item) => (
                        <option
                          key={item.CinemaHallID}
                          value={item.CinemaHallID}
                        >
                          {item.Name}
                        </option>
                      ))}
                    </select>
                    {formik.touched.CinemaHallID &&
                      formik.errors.CinemaHallID && (
                        <div className="text-red-500">
                          {formik.errors.CinemaHallID}
                        </div>
                      )}
                  </div>
                  <div className="mt-3 text-sm text-gray-600">
                    <label htmlFor="TimeFrameID" className="block text-left">
                      Chọn thời gian
                    </label>
                    <select
                      id="TimeFrameID"
                      name="TimeFrameID"
                      value={formik.values.TimeFrameID}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full p-2 mt-1 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-600"
                    >
                      <option value="">Chọn thời gian chiếu</option>
                      {timeFrame.map((item) => (
                        <option key={item.TimeFrameID} value={item.TimeFrameID}>
                          {item.StartTime}
                        </option>
                      ))}
                    </select>
                    {formik.touched.TimeFrameID &&
                      formik.errors.TimeFrameID && (
                        <div className="text-red-500">
                          {formik.errors.TimeFrameID}
                        </div>
                      )}
                  </div>
                  <div className="mt-3 text-sm text-gray-600">
                    <label htmlFor="Date" className="block text-left">
                      Chọn ngày chiếu
                    </label>
                    <input
                      type="date"
                      id="Date"
                      name="Date"
                      value={formik.values.Date}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full p-2 mt-1 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                    {formik.touched.Date && formik.errors.Date && (
                      <div className="text-red-500">{formik.errors.Date}</div>
                    )}
                  </div>
                  <div className="items-center gap-2 mt-3 sm:flex">
                    <button
                      type="submit"
                      className="w-full mt-2 p-2.5 flex-1 text-white bg-red-600 rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2"
                    >
                      Xác nhận
                    </button>
                    <button
                      type="button"
                      className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                      onClick={() => setOpenModal(false)}
                    >
                      Hủy
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
