const SuccessResponse = require("../common/Response/Success");
const ErrorResponse = require("../common/Response/Error");
const db = require("../config/dbconfig");
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");
dayjs.extend(utc);
dayjs.extend(timezone);
const getCinemaShowMovie = async (req, res, next) => {
  try {
    const { date, MovieID } = req.body;
    const requestDate = dayjs(date).tz("Asia/Ho_Chi_Minh");
    const currentTime = dayjs().tz("Asia/Ho_Chi_Minh");
    const currentDate = currentTime.startOf("day");

    const query = `
      SELECT 
        c.Name as CinemaName, 
        ch.CinemaHallID, 
        ch.Name as CinemaHallName, 
        st.ShowtimeID, 
        st.MovieID, 
        st.Date as ShowtimeDate, 
        tf.StartTime as StartTime 
      FROM showtimes as st 
      JOIN cinemahalls as ch ON st.CinemaHallID = ch.CinemaHallID 
      JOIN cinemas as c ON ch.CinemaID = c.CinemaID 
      JOIN timeframes as tf ON st.TimeFrameID = tf.TimeFrameID 
      WHERE st.MovieID = ? AND DATE(st.Date) = ?`;

    const rows = await new Promise((resolve, reject) => {
      db.query(
        query,
        [MovieID, requestDate.format("YYYY-MM-DD")],
        (err, data) => {
          if (err) return ErrorResponse(res, 500, "Internal Server Error", err);
          resolve(data);
        }
      );
    });

    const groupedData = {};

    rows.forEach((row) => {
      const showtimeDateTime = dayjs(
        `${dayjs(row.ShowtimeDate).format("YYYY-MM-DD")}T${row.StartTime}`
      ).tz("Asia/Ho_Chi_Minh");
      if (requestDate.isAfter(currentDate)) {
        if (!groupedData[row.CinemaName]) {
          groupedData[row.CinemaName] = [];
        }
        groupedData[row.CinemaName].push({
          CinemaHallName: row.CinemaHallName,
          StartTime: row.StartTime,
          CinemaHallID: row.CinemaHallID,
          ShowtimeID: row.ShowtimeID,
        });
      } else if (
        requestDate.isSame(currentDate, "day") &&
        showtimeDateTime.isAfter(currentTime)
      ) {
        if (!groupedData[row.CinemaName]) {
          groupedData[row.CinemaName] = [];
        }
        groupedData[row.CinemaName].push({
          CinemaHallName: row.CinemaHallName,
          StartTime: row.StartTime,
          CinemaHallID: row.CinemaHallID,
          ShowtimeID: row.ShowtimeID,
        });
      }
    });

    const responseData = Object.keys(groupedData).map((cinemaName) => ({
      CinemaName: cinemaName,
      Showtimes: groupedData[cinemaName],
    }));

    SuccessResponse(res, 200, "Showtimes fetched successfully", responseData);
  } catch (error) {
    ErrorResponse(res, 500, "Internal Server Error", error);
  }
};

const getAllShowMovieByCinema = async (req, res, next) => {
  try {
    const { cinemaID, date } = req.body;
    const requestDate = dayjs(date).tz("Asia/Ho_Chi_Minh");
    const currentTime = dayjs().tz("Asia/Ho_Chi_Minh");
    const currentDate = currentTime.startOf("day");

    const query = `
      SELECT 
        c.Name as CinemaName, 
        ch.CinemaHallID, 
        ch.Name as CinemaHallName,
        st.ShowtimeID, 
        st.MovieID, 
        tf.StartTime as StartTime,
        m.Name as MovieName,
        m.Genres,
        m.Duration,
        m.Poster,
        m.Subtitle,
        st.Date as ShowtimeDate
      FROM 
        showtimes as st 
        JOIN cinemahalls as ch ON st.CinemaHallID = ch.CinemaHallID 
        JOIN cinemas as c ON ch.CinemaID = c.CinemaID 
        JOIN timeframes as tf ON st.TimeFrameID = tf.TimeFrameID 
        JOIN movies as m ON st.MovieID = m.MovieID
      WHERE 
        ch.CinemaID = ? 
        AND DATE(st.Date) = ?
    `;

    const rows = await new Promise((resolve, reject) => {
      db.query(
        query,
        [cinemaID, requestDate.format("YYYY-MM-DD")],
        (err, data) => {
          if (err) return ErrorResponse(res, 500, "Internal Server Error", err);
          resolve(data);
        }
      );
    });
    const movieMap = new Map();
    rows.forEach((row) => {
      const showtimeDateTime = dayjs(
        `${dayjs(row.ShowtimeDate).format("YYYY-MM-DD")}T${row.StartTime}`
      ).tz("Asia/Ho_Chi_Minh");

      if (requestDate.isAfter(currentDate)) {
        if (!movieMap.has(row.MovieID)) {
          movieMap.set(row.MovieID, {
            MovieID: row.MovieID,
            MovieName: row.MovieName,
            Genres: row.Genres,
            Duration: row.Duration,
            Poster: row.Poster,
            Subtitle: row.Subtitle,
            CinemaName: row.CinemaName,
            Showtimes: [],
          });
        }
        const movie = movieMap.get(row.MovieID);
        movie.Showtimes.push({
          ShowtimeID: row.ShowtimeID,
          StartTime: row.StartTime,
          CinemaHallID: row.CinemaHallID,
          CinemaHallName: row.CinemaHallName,
        });
      } else if (
        requestDate.isSame(currentDate, "day") &&
        showtimeDateTime.isAfter(currentTime)
      ) {
        if (!movieMap.has(row.MovieID)) {
          movieMap.set(row.MovieID, {
            MovieID: row.MovieID,
            MovieName: row.MovieName,
            Genres: row.Genres,
            Duration: row.Duration,
            Poster: row.Poster,
            Subtitle: row.Subtitle,
            CinemaName: row.CinemaName,
            Showtimes: [],
          });
        }
        const movie = movieMap.get(row.MovieID);
        movie.Showtimes.push({
          ShowtimeID: row.ShowtimeID,
          StartTime: row.StartTime,
          CinemaHallID: row.CinemaHallID,
          CinemaHallName: row.CinemaHallName,
        });
      }
    });

    const responseData = [...movieMap.values()];

    SuccessResponse(res, 200, "Showtimes fetched successfully", responseData);
  } catch (error) {
    ErrorResponse(res, 500, "Internal Server Error", error);
  }
};

const getSeatForBooking = async (req, res, next) => {
  try {
    const { ShowtimeID, CinemaHallID } = req.body;
    const q =
      "SELECT cs.CinemaSeatID, cs.SeatName,cs.SeatType,ss.SeatStatus,ss.Price FROM cinemaseats cs JOIN showseats ss ON cs.CinemaSeatID = ss.CinemaSeatID WHERE ss.ShowtimeID = ? AND cs.CinemaHallID = ?";

    const rows = await new Promise((resolve, reject) => {
      db.query(q, [ShowtimeID, CinemaHallID], (err, data) => {
        if (err) return ErrorResponse(res, 500, "Internal Server Error", err);
        resolve(data);
      });
    });

    SuccessResponse(res, 200, "Seats fetched successfully", rows);
  } catch (error) {
    ErrorResponse(res, 500, "Internal Server Error", error);
  }
};

module.exports = {
  getCinemaShowMovie,
  getSeatForBooking,
  getAllShowMovieByCinema,
};
