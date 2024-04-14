import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import ModalCreateCinema from "../../../components/common/Modal/ModalCreateCinema";
import column from "../../../services/table/columnCinema";
import { setLoading } from "../../../stores/loadingSlice";
import { fetchCinema } from "../../../stores/cinemaSlice";
const Cinema = () => {
  const cinema = useSelector((state) => state.cinema.Cinema);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    document.title = "Quản lí rạp";
    const fetchData = async () => {
      dispatch(setLoading(true));
      try {
        await dispatch(fetchCinema());
        dispatch(setLoading(false));
      } catch (error) {
        dispatch(setLoading(false));
      }
    };
    fetchData();
  }, [dispatch]);

  return (
    <>
      <div className="container mx-auto px-4 sm:px-8">
        <h1 className="text-center text-xl text-yellow-500">
          Quản lí rạp trong hệ thống
        </h1>
        <div className="mt-4">
          <div className="flex justify-start">
            <button
              onClick={() => setShowModal(true)}
              className="bg-green-500 p-2 text-white rounded-md hover:bg-blue-700
            "
            >
              Thêm mới rạp
            </button>
          </div>

          <DataTable
            title="Danh sách rạp"
            columns={column}
            data={cinema}
            pagination
            paginationPerPage={3}
            highlightOnHover
            pointerOnHover
            dense
          />
        </div>
      </div>
      {showModal && <ModalCreateCinema setOpenModal={setShowModal} />}
    </>
  );
};

export default Cinema;
