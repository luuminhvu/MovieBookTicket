import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../stores/loadingSlice";
import { fetchCinema, fetchCinemaHall } from "../../../stores/cinemaSlice";
import column from "../../../services/table/columnCinemaHall";
import ModalCreateCinemaHall from "../../../components/common/Modal/ModalCreateCinemaHall";
const CinemaHall = () => {
  const cinemaHall = useSelector((state) => state.cinema.CinemaHall);
  const cinema = useSelector((state) => state.cinema.Cinema);
  const [selectedCinema, setSelectedCinema] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    document.title = "Quản lí phòng chiếu";
    const fetchData = async () => {
      dispatch(setLoading(true));
      try {
        await Promise.all([
          dispatch(fetchCinema()),
          dispatch(fetchCinemaHall()),
        ]);
        dispatch(setLoading(false));
      } catch (error) {
        dispatch(setLoading(false));
      }
    };
    fetchData();
  }, [dispatch]);
  const handleCinemaChange = (event) => {
    setSelectedCinema(event.target.value);
  };
  const filterCinemaHall =
    selectedCinema === "all"
      ? cinemaHall
      : // eslint-disable-next-line eqeqeq
        cinemaHall.filter((item) => item.CinemaID == selectedCinema);

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <h1 className="text-center text-xl text-yellow-500">
        Quản lí phòng chiếu trong hệ thống
      </h1>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="flex justify-start">
          <button
            onClick={() => setShowModal(true)}
            className="bg-green-500 p-2 text-white rounded-md hover:bg-blue-700
            "
          >
            Thêm mới phòng chiếu
          </button>
        </div>
        <div className="flex justify-end">
          <select
            value={selectedCinema}
            onChange={handleCinemaChange}
            className="p-2 border border-gray-600 rounded-md w-1/2"
          >
            <option value="all">Tất cả rạp</option>
            {cinema.map((item) => (
              <option className="p-2" key={item.CinemaID} value={item.CinemaID}>
                {item.Name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <DataTable
        title="Danh sách rạp"
        columns={column}
        data={filterCinemaHall}
        pagination
        paginationPerPage={6}
        highlightOnHover
        pointerOnHover
        dense
      />
      {showModal && <ModalCreateCinemaHall setOpenModal={setShowModal} />}
    </div>
  );
};

export default CinemaHall;
