import { useState } from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../stores/loadingSlice";
import * as Yup from "yup";
import dayjs from "dayjs";
import { editMovie } from "../../../stores/movieSlice";

const ModalEditMv = ({ setOpenModal, row }) => {
  const dispatch = useDispatch();
  const [poster, setPoster] = useState("");
  const handleUploadPoster = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith("image")) {
        transformFile(file);
      } else {
        alert(
          "File không đúng định dạng, vui lòng chọn file ảnh có đuôi .jpg, .png, .jpeg"
        );
      }
    }
  };

  const transformFile = (file) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPoster(reader.result);
        formik.setFieldValue("Poster", reader.result);
      };
    } else {
      setPoster("");
    }
  };

  const formik = useFormik({
    initialValues: {
      Actors: row.Actors,
      Age: row.Age,
      Country: row.Country,
      Description: row.Description,
      Directors: row.Directors,
      Duration: row.Duration,
      Genres: row.Genres,
      Image1: "",
      Image2: "",
      Image3: "",
      Image4: "",
      Language: row.Language,
      Name: row.Name,
      Poster: row.Poster,
      Rating: row.Rating,
      ReleaseDate: row.ReleaseDate,
      Subtitle: row.Subtitle,
      Trailer: row.Trailer,
      Active: row.Active,
      Upcoming: row.Upcoming,
    },
    validationSchema: Yup.object({
      Name: Yup.string().required("Tên phim không được để trống"),
      ReleaseDate: Yup.string().required("Ngày phát hành không được để trống"),
      Description: Yup.string().required("Mô tả không được để trống"),
      Genres: Yup.string().required("Thể loại không được để trống"),
      Directors: Yup.string().required("Đạo diễn không được để trống"),
      Actors: Yup.string().required("Diễn viên không được để trống"),
      Duration: Yup.string().required("Thời lượng không được để trống"),
      Language: Yup.string().required("Ngôn ngữ không được để trống"),
      Country: Yup.string().required("Quốc gia không được để trống"),
      Poster: Yup.string().required("Poster không được để trống"),
      Trailer: Yup.string().required("Trailer không được để trống"),
      Subtitle: Yup.string().required("Phụ đề không được để trống"),
      Active: Yup.string().required("Trạng thái không được để trống"),
      Upcoming: Yup.string().required("Trạng thái không được để trống"),
    }),
    onSubmit: async (values) => {
      try {
        dispatch(setLoading(true));
        dispatch(editMovie({ MovieID: row.MovieID, ...values }));
        dispatch(setLoading(false));
        setOpenModal(false);
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
                  Thêm mới bộ phim
                </h4>
                <form onSubmit={formik.handleSubmit}>
                  <div className="mt-3 text-sm text-gray-600">
                    <label htmlFor="Name" className="block text-left">
                      Tên phim
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
                    <label htmlFor="Description" className="block text-left">
                      Mô tả
                    </label>
                    <textarea
                      type="text"
                      id="Description"
                      name="Description"
                      value={formik.values.Description}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
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
                    <label htmlFor="ReleaseDate" className="block text-left">
                      Ngày phát hành
                    </label>
                    <input
                      type="date"
                      id="ReleaseDate"
                      name="ReleaseDate"
                      value={
                        dayjs(formik.values.ReleaseDate).format("YYYY-MM-DD") ||
                        ""
                      }
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full p-2 mt-1 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                    {formik.touched.ReleaseDate &&
                      formik.errors.ReleaseDate && (
                        <div className="text-red-500">
                          {formik.errors.ReleaseDate}
                        </div>
                      )}
                  </div>

                  <div className="mt-3 text-sm text-gray-600">
                    <label htmlFor="Genres" className="block text-left">
                      Thể loại
                    </label>
                    <input
                      type="text"
                      id="Genres"
                      name="Genres"
                      value={formik.values.Genres}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full p-2 mt-1 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                    {formik.touched.Genres && formik.errors.Genres && (
                      <div className="text-red-500">{formik.errors.Genres}</div>
                    )}
                  </div>
                  <div className="mt-3 text-sm text-gray-600">
                    <label htmlFor="Directors" className="block text-left">
                      Đạo diễn
                    </label>
                    <input
                      type="text"
                      id="Directors"
                      name="Directors"
                      value={formik.values.Directors}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full p-2 mt-1 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                    {formik.touched.Directors && formik.errors.Directors && (
                      <div className="text-red-500">
                        {formik.errors.Directors}
                      </div>
                    )}
                  </div>
                  <div className="mt-3 text-sm text-gray-600">
                    <label htmlFor="Actors" className="block text-left">
                      Diễn viên
                    </label>
                    <input
                      type="text"
                      id="Actors"
                      name="Actors"
                      value={formik.values.Actors}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full p-2 mt-1 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                    {formik.touched.Actors && formik.errors.Actors && (
                      <div className="text-red-500">{formik.errors.Actors}</div>
                    )}
                  </div>
                  <div className="mt-3 text-sm text-gray-600">
                    <label htmlFor="Duration" className="block text-left">
                      Thời lượng
                    </label>
                    <input
                      type="number"
                      id="Duration"
                      name="Duration"
                      value={formik.values.Duration}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full p-2 mt-1 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                    {formik.touched.Duration && formik.errors.Duration && (
                      <div className="text-red-500">
                        {formik.errors.Duration}
                      </div>
                    )}
                  </div>

                  <div className="mt-3 text-sm text-gray-600">
                    <label htmlFor="Language" className="block text-left">
                      Ngôn ngữ
                    </label>
                    <input
                      type="text"
                      id="Language"
                      name="Language"
                      value={formik.values.Language}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full p-2 mt-1 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                    {formik.touched.Language && formik.errors.Language && (
                      <div className="text-red-500">
                        {formik.errors.Language}
                      </div>
                    )}
                  </div>
                  <div className="mt-3 text-sm text-gray-600">
                    <label htmlFor="Country" className="block text-left">
                      Quốc gia
                    </label>
                    <input
                      type="text"
                      id="Country"
                      name="Country"
                      value={formik.values.Country}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full p-2 mt-1 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                    {formik.touched.Country && formik.errors.Country && (
                      <div className="text-red-500">
                        {formik.errors.Country}
                      </div>
                    )}
                  </div>
                  <div className="mt-3 text-sm text-gray-600">
                    <label htmlFor="Rating" className="block text-left">
                      Đánh giá
                    </label>
                    <input
                      type="number"
                      id="Rating"
                      name="Rating"
                      value={formik.values.Rating}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full p-2 mt-1 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                    {formik.touched.Rating && formik.errors.Rating && (
                      <div className="text-red-500">{formik.errors.Rating}</div>
                    )}
                  </div>
                  <div className="mt-3 text-sm text-gray-600">
                    <label htmlFor="Poster" className="block text-left">
                      Poster
                    </label>
                    <input
                      type="file"
                      id="Poster"
                      name="Poster"
                      onChange={handleUploadPoster}
                      className="w-full p-2 mt-1 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                    {formik.touched.Poster && formik.errors.Poster && (
                      <div className="text-red-500">{formik.errors.Poster}</div>
                    )}
                    {poster ? (
                      <img
                        src={poster}
                        alt={poster}
                        className="w-20 h-20 mt-2"
                      />
                    ) : (
                      <img
                        src={formik.values.Poster}
                        alt={formik.values.Poster}
                        className="w-20 h-20 mt-2"
                      />
                    )}
                  </div>
                  {/* <div className="mt-3 text-sm text-gray-600">
                      <label htmlFor="Image1" className="block text-left">
                        Hình ảnh 1
                      </label>
                      <input
                        type="text"
                        id="Image1"
                        name="Image1"
                        value={formik.values.Image1}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full p-2 mt-1 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-600"
                      />
                      {formik.touched.Image1 && formik.errors.Image1 && (
                        <div className="text-red-500">{formik.errors.Image1}</div>
                      )}
                    </div>
                    <div className="mt-3 text-sm text-gray-600">
                      <label htmlFor="Image2" className="block text-left">
                        Hình ảnh 2
                      </label>
                      <input
                        type="text"
                        id="Image2"
                        name="Image2"
                        value={formik.values.Image2}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full p-2 mt-1 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-600"
                      />
                      {formik.touched.Image2 && formik.errors.Image2 && (
                        <div className="text-red-500">{formik.errors.Image2}</div>
                      )}
                    </div>
                    <div className="mt-3 text-sm text-gray-600">
                      <label htmlFor="Image3" className="block text-left">
                        Hình ảnh 3
                      </label>
                      <input
                        type="text"
                        id="Image3"
                        name="Image3"
                        value={formik.values.Image3}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full p-2 mt-1 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-600"
                      />
                      {formik.touched.Image3 && formik.errors.Image3 && (
                        <div className="text-red-500">{formik.errors.Image3}</div>
                      )}
                    </div>
                    <div className="mt-3 text-sm text-gray-600">
                      <label htmlFor="Image4" className="block text-left">
                        Hình ảnh 4
                      </label>
                      <input
                        type="text"
                        id="Image4"
                        name="Image4"
                        value={formik.values.Image4}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full p-2 mt-1 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-600"
                      />
                      {formik.touched.Image4 && formik.errors.Image4 && (
                        <div className="text-red-500">{formik.errors.Image4}</div>
                      )}
                    </div> */}
                  <div className="mt-3 text-sm text-gray-600">
                    <label htmlFor="Trailer" className="block text-left">
                      Trailer
                    </label>
                    <input
                      type="text"
                      id="Trailer"
                      name="Trailer"
                      value={formik.values.Trailer}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full p-2 mt-1 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                    {formik.touched.Trailer && formik.errors.Trailer && (
                      <div className="text-red-500">
                        {formik.errors.Trailer}
                      </div>
                    )}
                  </div>
                  <div className="mt-3 text-sm text-gray-600">
                    <label htmlFor="Subtitle" className="block text-left">
                      Phụ đề
                    </label>
                    <input
                      type="text"
                      id="Subtitle"
                      name="Subtitle"
                      value={formik.values.Subtitle}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full p-2 mt-1 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                    {formik.touched.Subtitle && formik.errors.Subtitle && (
                      <div className="text-red-500">
                        {formik.errors.Subtitle}
                      </div>
                    )}
                  </div>
                  <div className="mt-3 text-sm text-gray-600">
                    <label htmlFor="Age" className="block text-left">
                      Độ tuổi
                    </label>
                    <input
                      type="number"
                      id="Age"
                      name="Age"
                      value={formik.values.Age}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full p-2 mt-1 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                    {formik.touched.Age && formik.errors.Age && (
                      <div className="text-red-500">{formik.errors.Age}</div>
                    )}
                  </div>
                  <div className="mt-3 text-sm text-gray-600">
                    <label htmlFor="Active" className="block text-left">
                      Đang chiếu
                    </label>
                    <select
                      value={formik.values.Active}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      id="Active"
                      name="Active"
                      className="w-full p-2 mt-1 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-600"
                    >
                      <option value={1}>Đang chiếu</option>
                      <option value={0}>Không chiếu</option>
                    </select>
                    {formik.touched.Active && formik.errors.Active && (
                      <div className="text-red-500">{formik.errors.Active}</div>
                    )}
                  </div>
                  <div className="mt-3 text-sm text-gray-600">
                    <label htmlFor="Upcoming" className="block text-left">
                      Sắp chiếu
                    </label>
                    <select
                      value={formik.values.Upcoming}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      id="Upcoming"
                      name="Upcoming"
                      className="w-full p-2 mt-1 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-600"
                    >
                      <option value={1}>Sắp chiếu</option>
                      <option value={0}>Không sắp chiếu</option>
                    </select>
                    {formik.touched.Upcoming && formik.errors.Upcoming && (
                      <div className="text-red-500">
                        {formik.errors.Upcoming}
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
};

export default ModalEditMv;
