import { useState, useEffect, useCallback } from "react";
import { useLocation, useParams } from "react-router-dom";
import { setLoading } from "../../stores/loadingSlice";
import { getDetailMovie } from "../../services/function";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { fetchSeats } from "../../stores/seatSlice";
import bgScreen from "../../assets/images/bg-screen.png";
import Notice from "../../components/common/Notice";
import { useNavigate } from "react-router-dom";
import { checkActive } from "../../stores/authSlice";
import { useTranslation } from "react-i18next";
const BookSeat = () => {
  const auth = useSelector((state) => state.auth);
  const active = useSelector((state) => state.auth.active);
  const UserID = useSelector((state) => state.auth.userId);
  const navigate = useNavigate();
  const id = useParams().id;
  const date = useParams().date;
  const { t } = useTranslation();
  const { cinemaName, cinemaHallName, startTime, cinemaHallID, showTimeID } =
    useLocation().state || {};
  const seat = useSelector((state) => state.seat.seats);
  const dispatch = useDispatch();
  const [movie, setMovie] = useState([]);
  const [bookingSeats, setBookingSeats] = useState([]);
  const putBookingSeats = (seat) => {
    const index = bookingSeats.findIndex(
      (bookingSeat) => bookingSeat.SeatName === seat.SeatName
    );
    if (index === -1) {
      setBookingSeats([...bookingSeats, seat]);
    } else {
      setBookingSeats([
        ...bookingSeats.slice(0, index),
        ...bookingSeats.slice(index + 1),
      ]);
    }
  };
  useEffect(() => {
    if (!auth.username) {
      navigate("/login");
    }
  }, [auth, navigate]);
  const fetchData = useCallback(async () => {
    dispatch(setLoading(true));
    try {
      const [movieResponse] = await Promise.all([
        getDetailMovie(id),
        dispatch(checkActive(UserID)),
        dispatch(fetchSeats([showTimeID, cinemaHallID])),
      ]);
      setMovie(movieResponse[0]);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, id, showTimeID, cinemaHallID, UserID]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center border-b-2 border-gray-500 mt-8">
          <h1 className="text-3xl font-bold text-center mb-4">
            {t("chooseSeats")}
          </h1>
          <p className="text-gray-600 text-center">
            {t("movie")}: {movie.Name} - {t("day")}:{" "}
            {dayjs(date).format("DD/MM/YYYY")} - {t("theater")}: {cinemaName} -
            {t("hall")}: {cinemaHallName} - {t("showtime")}:{" "}
            {startTime.slice(0, 5)}
          </p>
        </div>
        <div className="mx-auto max-w-screen-sm">
          <div className="mb-8">
            <img src={bgScreen} alt="screen" className="w-full mx-auto mt-8" />
          </div>{" "}
          {Object.entries(seatsByRow).map(([row, rowSeats]) => (
            <div
              key={row}
              className="flex flex-wrap"
              style={{ marginLeft: "70px" }}
            >
              {rowSeats.map((seat) => (
                <div key={seat.CinemaSeatID} className="m-2">
                  <div
                    onClick={() => putBookingSeats(seat)}
                    className={`w-8 h-8 border rounded flex items-center justify-center cursor-pointer ${
                      seat.SeatType === "VIP"
                        ? "border-blue-500 text-purple-900 font-bold"
                        : "border-gray-400"
                    } ${
                      seat.SeatStatus === "BOOKED"
                        ? "bg-red-400 pointer-events-none"
                        : seat.SeatStatus === "LOCKED"
                        ? "bg-yellow-400 pointer-events-none"
                        : seat.SeatStatus === "EMPTY"
                        ? "bg-gray-200 hover:bg-green-500 hover:text-white hover:border-green-500"
                        : ""
                    } ${
                      bookingSeats.some(
                        (bookingSeat) => bookingSeat.SeatName === seat.SeatName
                      )
                        ? "bg-green-500"
                        : ""
                    }`}
                  >
                    <span className="text-xs text-center">{seat.SeatName}</span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
        <Notice />
        <div className="flex items-stretch mt-8 my-8 bg-slate-950 p-4 rounded-lg">
          <div className="flex flex-col items-center justify-center w-1/3">
            <h2 className="text-2xl font-bold text-white">{t("movieInfo")}</h2>
            <img
              src={movie.Poster}
              alt={movie.Name}
              className="w-24 h-36 mt-4"
            />
            <p className="text-white">{movie.Name}</p>
            <p className="text-white">T{movie.Age}</p>
          </div>
          <div className="flex flex-col font-bold items-center w-1/3 justify-between">
            <h2 className="text-2xl font-bold text-white">
              {t("showtimeInfo")}
            </h2>
            <p className="text-white">
              {t("theater")}: {cinemaName}
            </p>
            <p className="text-white">
              {t("hall")}: {cinemaHallName}
            </p>
            <p className="text-white">
              {t("showtime")}: {startTime.slice(0, 5)}
            </p>
            <p className="text-white">
              {t("day")}: {dayjs(date).format("DD/MM/YYYY")}
            </p>
            <p className="text-white">
              {t("seat")}:{" "}
              {bookingSeats
                .map((seat) => seat.SeatType + " " + seat.SeatName + " ")
                .join(", ")}
            </p>
          </div>
          <div className="flex flex-col items-center w-1/3">
            <h2 className="text-2xl font-bold text-white">{t("total")}</h2>
            <p className="text-white">
              {bookingSeats
                .map((seat) => parseFloat(seat.Price))
                .reduce((a, b) => a + b, 0)}{" "}
              VNĐ
            </p>
            {active === 1 && bookingSeats.length > 0 ? (
              <button
                onClick={() => {
                  navigate("/movie/checkout", {
                    state: {
                      bookingSeats,
                      movie,
                      cinemaName,
                      cinemaHallName,
                      startTime,
                      date,
                      showTimeID,
                    },
                  });
                }}
                className="bg-green-500 px-4 py-2 rounded-lg mt-4"
              >
                {t("booking")}
              </button>
            ) : (
              <button
                className="bg-gray-500 text-white rounded-lg p-2 mt-4"
                disabled
              >
                {active === 1 ? t("noChosenSeat") : t("pleaseActiveAccount")}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BookSeat;
