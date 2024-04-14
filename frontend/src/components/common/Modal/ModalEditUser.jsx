import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../stores/loadingSlice";
import * as Yup from "yup";
import dayjs from "dayjs";
import { updateUserForAdmin } from "../../../services/function";

const ModalEditUser = ({ setOpenModal, row }) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      FullName: row?.FullName,
      Birthday: dayjs(row.Birthday).format("YYYY-MM-DD"),
      Phone: row?.Phone,
      Active: row?.Active,
      Address: row?.Address,
    },
    validationSchema: Yup.object({
      FullName: Yup.string().required("Vui lòng nhập họ và tên"),
      Birthday: Yup.string().required("Vui lòng nhập ngày sinh"),
      Phone: Yup.string().required("Vui lòng nhập số điện thoại"),
      Active: Yup.number().required("Vui lòng chọn trạng thái"),
      Address: Yup.string().required("Vui lòng nhập địa chỉ"),
    }),
    onSubmit: async (values) => {
      try {
        dispatch(setLoading(true));
        await updateUserForAdmin({ ...values, UserID: row.UserID });
        dispatch(setLoading(false));
        setOpenModal(false);
        window.location.reload();
      } catch (error) {
        console.error("Lỗi khi chỉnh sửa bộ phim:", error);
      }
    },
  });

  return (
    <>
      <div className="fixed inset-0 z-10 overflow-y-auto ">
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
                  Chỉnh sửa thành viên
                </h4>
                <form onSubmit={formik.handleSubmit}>
                  <div className="mt-3 text-sm text-gray-600">
                    <label htmlFor="FullName" className="block text-left">
                      Họ và tên
                    </label>
                    <input
                      type="text"
                      id="FullName"
                      name="FullName"
                      value={formik.values.FullName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full p-2 mt-1 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                    {formik.touched.FullName && formik.errors.FullName && (
                      <div className="text-red-500">
                        {formik.errors.FullName}
                      </div>
                    )}
                  </div>

                  <div className="mt-3 text-sm text-gray-600">
                    <label htmlFor="Birthday" className="block text-left">
                      Ngày sinh
                    </label>
                    <input
                      type="date"
                      id="Birthday"
                      name="Birthday"
                      value={formik.values.Birthday}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full p-2 mt-1 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                    {formik.touched.Birthday && formik.errors.Birthday && (
                      <div className="text-red-500">
                        {formik.errors.Birthday}
                      </div>
                    )}
                  </div>
                  <div className="mt-3 text-sm text-gray-600">
                    <label htmlFor="Phone" className="block text-left">
                      Số điện thoại
                    </label>
                    <input
                      type="text"
                      id="Phone"
                      name="Phone"
                      value={formik.values.Phone}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full p-2 mt-1 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                    {formik.touched.Phone && formik.errors.Phone && (
                      <div className="text-red-500">{formik.errors.Phone}</div>
                    )}
                  </div>
                  <div className="mt-3 text-sm text-gray-600">
                    <label htmlFor="Address" className="block text-left">
                      Địa chỉ
                    </label>
                    <input
                      type="text"
                      id="Address"
                      name="Address"
                      value={formik.values.Address}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full p-2 mt-1 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                    {formik.touched.Address && formik.errors.Address && (
                      <div className="text-red-500">
                        {formik.errors.Address}
                      </div>
                    )}
                  </div>
                  <div className="mt-3 text-sm text-gray-600">
                    <label htmlFor="Active" className="block text-left">
                      Active
                    </label>
                    <select
                      id="Active"
                      name="Active"
                      value={formik.values.Active}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full p-2 mt-1 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-600"
                    >
                      <option value={1}>Active</option>
                      <option value={0}>Inactive</option>
                    </select>
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
};

export default ModalEditUser;
