import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLoading } from "../../../stores/loadingSlice";
import { getSeatOfCinemaHall } from "../../../stores/seatSlice";

import DataTable from "react-data-table-component";
import column from "../../../services/table/columnSeat";
const Seat = () => {
  const dispatch = useDispatch();
  const seats = useSelector((state) => state.seat.seatOfCinemaHall);
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
      </>
    </>
  );
};

export default Seat;
