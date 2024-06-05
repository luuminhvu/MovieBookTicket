import * as Yup from "yup";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../stores/loadingSlice";
import { editVoucher } from "../../../stores/voucherSlice";
import dayjs from "dayjs";

export default function ModalEditVoucher({ setOpenModal, row }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      Description: row.Description,
      Discount: row.Discount,
      ExpiryDate: dayjs(row.ExpiryDate).format("YYYY-MM-DD"),
      VoucherCode: row.VoucherCode,
      Active: row.Active,
    },
    validationSchema: Yup.object({
      Description: Yup.string().required(t("required")),
      Discount: Yup.number()
        .required(t("required"))
        .min(0, t("must_be_positive")),
      ExpiryDate: Yup.date().required(t("required")),
      VoucherCode: Yup.string().required(t("required")),
    }),
    onSubmit: async (values) => {
      dispatch(setLoading(true));
      try {
        await dispatch(editVoucher({ id: row.VoucherID, voucher: values }));
        dispatch(setLoading(false));
        setOpenModal(false);
      } catch (error) {
        console.error("Lỗi khi chỉnh sửa voucher:", error);
        dispatch(setLoading(false));
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
              <div className="flex items-center justify-center flex-none w-20 h-20 mx-auto bg-green-500 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-database-add w-14 h-14"
                  viewBox="0 0 16 16"
                >
                  <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0" />
                  <path d="M12.096 6.223A5 5 0 0 0 13 5.698V7c0 .289-.213.654-.753 1.007a4.5 4.5 0 0 1 1.753.25V4c0-1.007-.875-1.755-1.904-2.223C11.022 1.289 9.573 1 8 1s-3.022.289-4.096.777C2.875 2.245 2 2.993 2 4v9c0 1.007.875 1.755 1.904 2.223C4.978 15.71 6.427 16 8 16c.536 0 1.058-.034 1.555-.097a4.5 4.5 0 0 1-.813-.927Q8.378 15 8 15c-1.464 0-2.766-.27-3.682-.687C3.356 13.875 3 13.373 3 13v-1.302c.271.202.58.378.904.525C4.978 12.71 6.427 13 8 13h.027a4.6 4.6 0 0 1 0-1H8c-1.464 0-2.766-.27-3.682-.687C3.356 10.875 3 10.373 3 10V8.698c.271.202.58.378.904.525C4.978 9.71 6.427 10 8 10q.393 0 .774-.024a4.5 4.5 0 0 1 1.102-1.132C9.298 8.944 8.666 9 8 9c-1.464 0-2.766-.27-3.682-.687C3.356 7.875 3 7.373 3 7V5.698c.271.202.58.378.904.525C4.978 6.711 6.427 7 8 7s3.022-.289 4.096-.777M3 4c0-.374.356-.875 1.318-1.313C5.234 2.271 6.536 2 8 2s2.766.27 3.682.687C12.644 3.125 13 3.627 13 4c0 .374-.356.875-1.318 1.313C10.766 5.729 9.464 6 8 6s-2.766-.27-3.682-.687C3.356 4.875 3 4.373 3 4" />
                </svg>
              </div>
              <div className="mt-2 text-center sm:ml-4 sm:text-left">
                <h4 className="text-lg font-medium text-gray-800 text-center">
                  Thêm Voucher mới
                </h4>
                <form onSubmit={formik.handleSubmit}>
                  <div className="mt-3 text-sm text-gray-600">
                    <label htmlFor="Description" className="block text-left">
                      Mô tả
                    </label>
                    <input
                      type="text"
                      id="Description"
                      name="Description"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.Description}
                      className="w-full p-2 mt-1 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                    {formik.touched.Description &&
                      formik.errors.Description && (
                        <div className="text-red-500">
                          {formik.errors.Description}
                        </div>
                      )}
                  </div>

                  <div className="mt-3 text-sm text-gray-600">
                    <label htmlFor="Discount" className="block text-left">
                      Giảm giá (%)
                    </label>
                    <input
                      type="number"
                      id="Discount"
                      name="Discount"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.Discount}
                      className="w-full p-2 mt-1 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                    {formik.touched.Discount && formik.errors.Discount && (
                      <div className="text-red-500">
                        {formik.errors.Discount}
                      </div>
                    )}
                  </div>

                  <div className="mt-3 text-sm text-gray-600">
                    <label htmlFor="ExpiryDate" className="block text-left">
                      Ngày hết hạn
                    </label>
                    <input
                      type="date"
                      id="ExpiryDate"
                      name="ExpiryDate"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.ExpiryDate}
                      className="w-full p-2 mt-1 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                    {formik.touched.ExpiryDate && formik.errors.ExpiryDate && (
                      <div className="text-red-500">
                        {formik.errors.ExpiryDate}
                      </div>
                    )}
                  </div>

                  <div className="mt-3 text-sm text-gray-600">
                    <label htmlFor="VoucherCode" className="block text-left">
                      Mã voucher
                    </label>
                    <input
                      type="text"
                      id="VoucherCode"
                      name="VoucherCode"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.VoucherCode}
                      className="w-full p-2 mt-1 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                    {formik.touched.VoucherCode &&
                      formik.errors.VoucherCode && (
                        <div className="text-red-500">
                          {formik.errors.VoucherCode}
                        </div>
                      )}
                  </div>
                  <div className="mt-3 text-sm text-gray-600">
                    <label
                      htmlFor="Active"
                      className="relative flex items-center mb-5 cursor-pointer"
                    >
                      <input
                        id="Active"
                        name="Active"
                        type="checkbox"
                        checked={formik.values.Active === 1}
                        onChange={(e) =>
                          formik.setFieldValue(
                            "Active",
                            e.target.checked ? 1 : 0
                          )
                        }
                        onBlur={formik.handleBlur}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-gray-200 hover:bg-gray-300 peer-focus:outline-0 rounded-full peer transition-all ease-in-out duration-500 peer-checked:after:translate-x-full peer-checked:after:border-transparent after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600 hover:peer-checked:bg-indigo-700 "></div>
                      <span className="ml-3 text-sm font-medium text-gray-600 ">
                        Active
                      </span>
                    </label>
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
