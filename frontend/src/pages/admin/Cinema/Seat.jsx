import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLoading } from "../../../stores/loadingSlice";
import { getSeatOfCinemaHall } from "../../../stores/seatSlice";

import DataTable from "react-data-table-component";
import column from "../../../services/table/columnSeat";
const Seat = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const seats = useSelector((state) => state.seat.seatOfCinemaHall);
  console.log(seats);
  useEffect(() => {
    document.title = "Quản lí ghế";
    const fetchData = async () => {
      dispatch(setLoading(true));
      try {
        await dispatch(getSeatOfCinemaHall());
        dispatch(setLoading(false));
      } catch (error) {
        dispatch(setLoading(false));
      }
    };
    fetchData();
  }, [dispatch]);
  return (
    <>
      <>
        <div className="container mx-auto px-4 sm:px-8">
          <h1 className="text-center text-xl text-blue-500">
            Quản lí ghế trong các phòng chiếu
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
              title="Danh sách ghế"
              columns={column}
              data={seats}
              pagination
              paginationPerPage={5}
              highlightOnHover
              pointerOnHover
              dense
            />
          </div>
        </div>
        {/* {showModal && <ModalCreateCinema setOpenModal={setShowModal} />} */}
      </>
    </>
  );
};

export default Seat;
