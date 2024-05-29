const SuccessResponse = require("../common/Response/Success");
const ErrorResponse = require("../common/Response/Error");

const db = require("../config/dbconfig");

const getOrderByUser = async (req, res, next) => {
  try {
    const { UserID } = req.body;
    const q = `
    SELECT
        bk.BookingID,
        bk.ShowtimeID,
        bk.BookingDate,
        bk.NumberOfTickets,
        bk.TotalPrice,
        GROUP_CONCAT(ss.CinemaSeatID) AS CinemaSeatIDs,
        GROUP_CONCAT(cs.SeatName) AS SeatNames,
        ch.Name AS CinemaHallName,
        c.Name AS CinemaName,
        mv.Name AS MovieName,
        mv.Duration,
        mv.MovieID,
        mv.Poster,
        mv.Age,
        tf.StartTime,
        tf.EndTime,
        st.Date,
        pm.PaymentMethod
    FROM
        bookings AS bk
        JOIN payments AS pm ON bk.BookingID = pm.BookingID
        JOIN showseats AS ss ON bk.BookingID = ss.BookingID
        JOIN cinemaseats AS cs ON ss.CinemaSeatID = cs.CinemaSeatID
        JOIN cinemahalls AS ch ON cs.CinemaHallID = ch.CinemaHallID
        JOIN cinemas AS c ON ch.CinemaID = c.CinemaID
        JOIN showtimes AS st ON bk.ShowtimeID = st.ShowtimeID
        JOIN movies AS mv ON st.MovieID = mv.MovieID
        JOIN timeframes AS tf ON st.TimeFrameID = tf.TimeFrameID
    WHERE
        bk.CustomerID = ${UserID}
    GROUP BY
        bk.BookingID,
        bk.ShowtimeID,
        bk.BookingDate,
        bk.NumberOfTickets,
        bk.TotalPrice,
        ch.Name,
        c.Name,
        mv.Name,
        mv.Duration,
        mv.MovieID,
        mv.Poster,
        mv.Age,
        tf.StartTime,
        tf.EndTime,
        st.Date,
        pm.PaymentMethod
    ORDER BY
        bk.BookingDate DESC
  `;

    // Execute the query
    db.query(q, (err, result) => {
      if (err) {
        console.error(err);
        return;
      }
    });

    const rows = await new Promise((resolve, reject) => {
      db.query(q, (err, data) => {
        if (err) return ErrorResponse(res, 500, "Internal Server Error", err);

        resolve(data);
      });
    });
    SuccessResponse(res, 200, "Orders fetched successfully", rows);
  } catch (error) {
    ErrorResponse(res, 500, "Internal Server Error", error);
  }
};
const getOrders = async (req, res, next) => {
  try {
    const q = `
      SELECT
          bk.BookingID,
          bk.BookingDate,
          bk.NumberOfTickets,
          bk.TotalPrice,
          GROUP_CONCAT(ss.CinemaSeatID) AS CinemaSeatIDs,
          GROUP_CONCAT(cs.SeatName) AS SeatNames,
          ch.Name AS CinemaHallName,
          c.Name AS CinemaName,
          mv.Name AS MovieName,
          mv.Duration,
          mv.MovieID,
          mv.Poster,
          mv.Age,
          tf.StartTime,
          tf.EndTime,
          st.Date,
          u.UserID,
          u.Username,
          u.Email,
          u.Phone
      FROM
          bookings AS bk
          JOIN showseats AS ss ON bk.BookingID = ss.BookingID
          JOIN cinemaseats AS cs ON ss.CinemaSeatID = cs.CinemaSeatID
          JOIN cinemahalls AS ch ON cs.CinemaHallID = ch.CinemaHallID
          JOIN cinemas AS c ON ch.CinemaID = c.CinemaID
          JOIN showtimes AS st ON bk.ShowtimeID = st.ShowtimeID
          JOIN movies AS mv ON st.MovieID = mv.MovieID
          JOIN timeframes AS tf ON st.TimeFrameID = tf.TimeFrameID
          JOIN user AS u ON bk.CustomerID = u.UserID
      GROUP BY
          bk.BookingID, bk.BookingDate, bk.NumberOfTickets, bk.TotalPrice,
          ch.Name, c.Name, mv.Name, mv.Duration, mv.MovieID, mv.Poster, mv.Age, tf.StartTime, tf.EndTime,
          u.UserID, u.Username, u.Email, u.Phone
      ORDER BY
          bk.BookingDate DESC
    `;

    const rows = await new Promise((resolve, reject) => {
      db.query(q, (err, data) => {
        if (err) return ErrorResponse(res, 500, "Internal Server Error", err);
        resolve(data);
      });
    });

    SuccessResponse(res, 200, "Orders fetched successfully", rows);
  } catch (error) {
    ErrorResponse(res, 500, "Internal Server Error", error);
  }
};

module.exports = { getOrderByUser, getOrders };
