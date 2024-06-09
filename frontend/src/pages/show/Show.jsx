import { useEffect, useState } from "react";
import dayjs from "dayjs";
import DateSelector from "../../components/common/DatePicker";
import { useSelector } from "react-redux";
import { setLoading } from "../../stores/loadingSlice";
import { fetchCinema } from "../../stores/cinemaSlice";
import { useDispatch } from "react-redux";
import { fetchShowtimesAll } from "../../stores/showTimeSlice";
import TagIcon from "../../components/icons/Tag";
import StopWatchIcom from "../../components/icons/StopWatch";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
const Show = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
  const showTimes = useSelector((state) => state.show.allShowtimes);
  const handleDateChange = (selectedDate) => {
    setDate(selectedDate.format("YYYY-MM-DD"));
  };
  const [cinemaID, setCinemaID] = useState(1);
  const dispatch = useDispatch();
  const cinema = useSelector((state) => state.cinema.Cinema);
  const { t } = useTranslation();
  const handleChangeCinema = (e) => {
    setCinemaID(e.target.value);
  };
  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading(true));
      try {
        new Promise.all([
          dispatch(fetchCinema()),
          dispatch(fetchShowtimesAll({ date, cinemaID })),
        ]);
        dispatch(setLoading(false));
      } catch (error) {
        dispatch(setLoading(false));
      }
    };
    fetchData();
  }, [dispatch, date, cinemaID]);
  const handleButtonClick = (
    cinemaName,
    cinemaHallName,
    startTime,
    cinemaHallID,
    showTimeID,
    MovieID
  ) => {
    navigate(`/movie/bookings/${MovieID}/seats/${date}`, {
      state: {
        cinemaName,
        cinemaHallName,
        startTime,
        cinemaHallID,
        showTimeID,
      },
    });
  };

  return (
    <>
      <div className="container mx-auto px-4">
        <div className="flex items-start my-2">
          <select
            onChange={handleChangeCinema}
            className="p-2 border border-gray-600 rounded-xl mr-2 h-10 w-56"
          >
            {cinema.map((item) => (
              <option key={item.CinemaID} value={item.CinemaID}>
                {item.Name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col items-center justify-center border-b-2 border-gray-500">
          <DateSelector onDateChange={handleDateChange} />
        </div>
        <div className="flex flex-wrap m-4">
          {showTimes.length === 0 && (
            <span className="text-gray-600 mb-6">{t("sorryNoShowtime")} </span>
          )}
          {showTimes.map((movie, index) => (
            <div key={index} className="w-full md:w-1/2">
              <div className="flex mt-6">
                <div className="mr-4">
                  <img
                    src={movie.Poster}
                    alt={movie.MovieName}
                    className="w-48 h-full object-fill object-center rounded-lg"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="mb-4">
                    <h1
                      onClick={() => {
                        navigate(`/movie/${movie.MovieID}`);
                      }}
                      style={{ color: "#03599d" }}
                      className="text-xl font-bold"
                    >
                      {movie.MovieName}
                    </h1>

                    <div className="flex items-center text-gray-600 mt-5">
                      <div className="flex items-center mr-4">
                        <TagIcon className="w-4 h-4" />
                        <p className="ml-1">{movie.Genres}</p>
                      </div>
                      <div className="flex items-center">
                        <StopWatchIcom className="w-4 h-4 mr-1" />
                        <p className="ml-1">
                          {movie.Duration} {t("minutes")}
                        </p>
                      </div>
                    </div>

                    <p className="text-black font-bold uppercase mt-5">
                      {t("subtitle2D")} : {movie.Subtitle}
                    </p>
                  </div>
                  <div className="flex justify-between flex-wrap">
                    {movie.Showtimes.map((showtime, index) => (
                      <button
                        key={index}
                        className="text-sm font-semibold text-black w-20 py-2 mr-2"
                        style={{
                          backgroundColor: "#E5E5E5", // Sử dụng màu nền xám
                        }}
                        onClick={() => {
                          handleButtonClick(
                            movie.CinemaName,
                            showtime.CinemaHallName,
                            showtime.StartTime,
                            showtime.CinemaHallID,
                            showtime.ShowtimeID,
                            movie.MovieID
                          );
                        }}
                      >
                        {showtime.StartTime.slice(0, 5)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Show;
