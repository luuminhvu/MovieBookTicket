import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { setLoading } from "../../stores/loadingSlice";
import { getDetailMovie } from "../../services/function";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { fetchSeats } from "../../stores/seatSlice";
const BookSeat = () => {
  const seat = useSelector((state) => state.seat.seats);
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const date = queryParams.get("date");
  const cinemaName = queryParams.get("cinemaName");
  const cinemaHallName = queryParams.get("cinemaHallName");
  const startTime = queryParams.get("startTime");
  const cinemaHallID = queryParams.get("cinemaHallID");
  const [movie, setMovie] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getDetailMovie(id);
        setMovie(response[0]);
        dispatch(fetchSeats([id, cinemaHallID]));
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id, dispatch, cinemaHallID]);
  const seatsByRow = {};

  seat.forEach((seat) => {
    const row = seat.SeatName.charAt(0);
    if (!seatsByRow[row]) {
      seatsByRow[row] = [];
    }
    seatsByRow[row].push(seat);
  });
  return (
    <>
      <div className="container">
        <div className="flex flex-col items-center justify-center border-b-2 border-gray-500 mt-8">
          <h1 className="text-3xl font-bold text-center mb-4">Chọn ghế</h1>
          <p className="text-gray-600 text-center">
            Phim: {movie.Name} - Ngày: {dayjs(date).format("DD/MM/YYYY")} - Rạp:{" "}
            {cinemaName} - Phòng: {cinemaHallName} - Suất chiếu:{" "}
            {startTime.slice(0, 5)}
          </p>
        </div>
        <div className="mx-auto max-w-screen-md">
          {" "}
          {/* Đặt lớp mx-auto để căn giữa container */}
          {Object.entries(seatsByRow).map(([row, rowSeats]) => (
            <div
              key={row}
              className="flex flex-wrap"
              style={{ margin: "0 auto" }}
            >
              {rowSeats.map((seat) => (
                <div key={seat.ShowSeatID} className="m-2">
                  <div
                    className={`w-8 h-8 border rounded-full flex items-center justify-center ${
                      seat.SeatStatus === "EMPTY"
                        ? "border-gray-500"
                        : "border-red-500"
                    } ${
                      seat.SeatType === "VIP" ? "bg-yellow-200" : "bg-white"
                    }`}
                  >
                    <span className="text-xs text-center">{seat.SeatName}</span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BookSeat;
