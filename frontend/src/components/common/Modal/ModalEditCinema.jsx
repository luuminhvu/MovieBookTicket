import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../stores/loadingSlice";
import { editCinema } from "../../../stores/cinemaSlice";

export default function ModalEditCinema({ setOpenModal, row }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      Name: row.Name,
      Location: row.Location,
    },
    validationSchema: Yup.object({
      Name: Yup.string().required(t("required")),
      Location: Yup.string().required(t("required")),
    }),
    onSubmit: async (values) => {
      try {
        dispatch(setLoading(true));
        await dispatch(editCinema({ ...values, CinemaID: row.CinemaID }));
        dispatch(setLoading(false));
        setOpenModal(false);
      } catch (error) {
        console.error("Lỗi khi chỉnh sửa rạp chiếu:", error);
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
                  Chỉnh sửa rạp chiếu
                </h4>
                <form onSubmit={formik.handleSubmit}>
                  <div className="mt-3 text-sm text-gray-600">
                    <label htmlFor="Name" className="block text-left">
                      Tên rạp
                    </label>
                    <input
                      type="text"
                      id="Name"
                      name="Name"
                      value={formik.values.Name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full p-2 mt-1 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                    {formik.touched.Name && formik.errors.Name && (
                      <div className="text-red-500">{formik.errors.Name}</div>
                    )}
                  </div>
                  <div className="mt-3 text-sm text-gray-600">
                    <label htmlFor="Location" className="block text-left">
                      Địa Điểm
                    </label>
                    <input
                      type="text"
                      id="Location"
                      name="Location"
                      value={formik.values.Location}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full p-2 mt-1 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                    {formik.touched.Location && formik.errors.Location && (
                      <div className="text-red-500">
                        {formik.errors.Location}
                      </div>
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
