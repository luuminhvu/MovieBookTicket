import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { setLoading } from "../../stores/loadingSlice";
import { getDetailMovie } from "../../services/function";
import dayjs from "dayjs";
const BookSeat = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const date = queryParams.get("date");
  const cinemaName = queryParams.get("cinemaName");
  const cinemaHallName = queryParams.get("cinemaHallName");
  const startTime = queryParams.get("startTime");
  const [movie, setMovie] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getDetailMovie(id);
        setMovie(response[0]);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);
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
      </div>
    </>
  );
};

export default BookSeat;
