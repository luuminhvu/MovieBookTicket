import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../stores/loadingSlice";
import { editTimeFrame } from "../../../stores/timeFrameSlice";

export default function ModalEditTf({ setOpenModal, row }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      startTime: row.StartTime,
      endTime: row.EndTime,
    },
    validationSchema: Yup.object({
      startTime: Yup.string().required(t("required")),
      endTime: Yup.string().required(t("required")),
    }),
    onSubmit: async (values) => {
      try {
        dispatch(setLoading(true));
        await dispatch(
          editTimeFrame({ ...values, TimeFrameID: row.TimeFrameID })
        );
        dispatch(setLoading(false));
        setOpenModal(false);
      } catch (error) {
        console.error("Lỗi khi thêm mới thời gian chiếu:", error);
      }
    },
  });

  return (
    <>
      <div className="fixed inset-0 z-10 overflow-y-auto">
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
                  Chỉnh sửa thời gian chiếu
                </h4>
                <form onSubmit={formik.handleSubmit}>
                  <div className="mt-3 text-sm text-gray-600">
                    <label htmlFor="startTime" className="block text-left">
                      Giờ bắt đầu
                    </label>
                    <input
                      type="time"
                      id="startTime"
                      name="startTime"
                      value={formik.values.startTime}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full p-2 mt-1 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                    {formik.touched.startTime && formik.errors.startTime && (
                      <div className="text-red-500">
                        {formik.errors.startTime}
                      </div>
                    )}
                  </div>
                  <div className="mt-3 text-sm text-gray-600">
                    <label htmlFor="endTime" className="block text-left">
                      Giờ kết thúc
                    </label>
                    <input
                      type="time"
                      id="endTime"
                      name="endTime"
                      value={formik.values.endTime}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full p-2 mt-1 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                    {formik.touched.endTime && formik.errors.endTime && (
                      <div className="text-red-500">
                        {formik.errors.endTime}
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
