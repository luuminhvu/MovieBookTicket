import { useSelector, useDispatch } from "react-redux";
import SwiperCarousel from "../../../components/common/Swiper";
import {
  deletePoster,
  handleChangeActivePoster,
} from "../../../stores/movieSlice";
import { setLoading } from "../../../stores/loadingSlice";
import ModalAddPoster from "../../../components/common/Modal/ModalAddPoster";
import { useState } from "react";

const SliderSetting = () => {
  const posters = useSelector((state) => state.movie.poster);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const handleChangeActive = async (id) => {
    dispatch(setLoading(true));
    try {
      await dispatch(handleChangeActivePoster({ PosterID: id }));
    } catch (error) {
      console.error("Error toggling active poster", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleDelete = async (id) => {
    dispatch(setLoading(true));
    try {
      await dispatch(deletePoster({ PosterID: id }));
    } catch (error) {
      console.error("Error deleting poster", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 sm:px-8 w-[600px]">
        <SwiperCarousel />
      </div>
      <button
        onClick={() => setShowModal(true)}
        className="bg-green-500 mt-2 text-white px-2 py-2 rounded ml-2"
      >
        Add Poster
      </button>
      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Poster ID
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Poster
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Active Poster
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {posters.map((poster) => (
                <tr key={poster.PosterID}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {poster.PosterID}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <img
                      src={poster.PosterURL}
                      alt={`Poster ${poster.PosterID}`}
                      className="w-80 h-30"
                    />
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <span
                      className={`relative inline-block px-3 py-1 font-semibold leading-tight ${
                        poster.ActivePoster ? "text-green-900" : "text-red-900"
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`absolute inset-0 ${
                          poster.ActivePoster ? "bg-green-200" : "bg-red-200"
                        } opacity-50 rounded-full`}
                      ></span>
                      <span className="relative">
                        {poster.ActivePoster ? "Active" : "Inactive"}
                      </span>
                    </span>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input
                        type="checkbox"
                        className="peer sr-only"
                        checked={poster.ActivePoster}
                        onChange={() => handleChangeActive(poster.PosterID)}
                      />
                      <div className="peer h-4 w-11 rounded border bg-slate-200 after:absolute after:-top-1 after:left-0 after:h-6 after:w-6 after:rounded-md after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-300 peer-checked:after:translate-x-full peer-focus:ring-green-300"></div>
                    </label>
                    <button
                      className="bg-red-500 text-white px-2 py-2 rounded ml-2"
                      onClick={() => handleDelete(poster.PosterID)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showModal && <ModalAddPoster setOpenModal={setShowModal} />}
    </>
  );
};

export default SliderSetting;
