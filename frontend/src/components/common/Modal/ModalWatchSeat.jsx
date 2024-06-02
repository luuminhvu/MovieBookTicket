import React, { useEffect } from "react";
import Notice from "../Notice";
import ProjectorIcon from "../../icons/Projector";
import { setLoading } from "../../../stores/loadingSlice";
import { useDispatch } from "react-redux";
import { getSeatsByCinemaHallID } from "../../../services/function";

export default function ModalWatchSeat({ setOpenModal, row }) {
  const dispatch = useDispatch();
  const [seat, setSeat] = React.useState([]);
  useEffect(() => {
    const fetchSeat = async () => {
      dispatch(setLoading(true));
      try {
        const seat = await getSeatsByCinemaHallID(row.CinemaHallID);
        setSeat(seat);
        dispatch(setLoading(false));
      } catch (error) {
        dispatch(setLoading(false));
        console.log(error);
      }
    };
    fetchSeat();
  }, [row.CinemaHallID, dispatch]);
  const seatsByRow = {};
  seat.forEach((seat) => {
    const rowName = seat.SeatName.charAt(0);
    if (!seatsByRow[rowName]) {
      seatsByRow[rowName] = [];
    }
    seatsByRow[rowName].push(seat);
  });
  const sortSeats = (seats) => {
    return seats.sort((a, b) => {
      const seatA = parseInt(a.SeatName.substring(1));
      const seatB = parseInt(b.SeatName.substring(1));
      return seatA - seatB;
    });
  };
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
              <div className="flex items-center justify-center flex-none w-24 h-24 mx-auto bg-red-100 rounded-full">
                <ProjectorIcon />
              </div>
              <div className="mt-2 text-center sm:ml-4 sm:text-left">
                <h4 className="text-lg font-medium text-gray-800 text-center">
                  Chế độ xem ghế
                </h4>
              </div>
              {Object.entries(seatsByRow)
                .sort(([rowA], [rowB]) => rowA.localeCompare(rowB)) // Sort rows alphabetically
                .map(([rowName, rowSeats]) => (
                  <div key={rowName} className="flex flex-wrap">
                    {sortSeats(rowSeats).map((seat) => (
                      <div key={seat.CinemaSeatID} className="m-2">
                        <div
                          className={`w-8 h-8 border rounded flex items-center justify-center ${
                            seat.SeatType === "Normal" ? "border-gray-300" : ""
                          } ${
                            seat.SeatType === "VIP" ? "border-blue-500" : ""
                          }`}
                        >
                          <span className="text-xs text-center">
                            {seat.SeatName}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
            </div>
            <Notice />
          </div>
        </div>
      </div>
    </>
  );
}
