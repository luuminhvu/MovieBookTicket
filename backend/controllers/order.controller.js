const SuccessResponse = require("../common/Response/Success");
const ErrorResponse = require("../common/Response/Error");

const db = require("../config/dbconfig");

const getOrderByUser = async (req, res, next) => {
  try {
    console.log(req.body);
    const { UserID } = req.body;
    const q = `SELECT
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
        st.Date
    FROM
        Bookings AS bk
        JOIN Showseats AS ss ON bk.BookingID = ss.BookingID
        JOIN Cinemaseats AS cs ON ss.CinemaSeatID = cs.CinemaSeatID
        JOIN Cinemahalls AS ch ON cs.CinemaHallID = ch.CinemaHallID
        JOIN Cinemas AS c ON ch.CinemaID = c.CinemaID
        JOIN Showtimes AS st ON bk.ShowtimeID = st.ShowtimeID
        JOIN Movies AS mv ON st.MovieID = mv.MovieID
        JOIN Timeframes AS tf ON st.TimeFrameID = tf.TimeFrameID
    WHERE
        bk.CustomerID = ${UserID}
    GROUP BY
        bk.BookingID, bk.ShowtimeID, bk.BookingDate, bk.NumberOfTickets, bk.TotalPrice,
        ch.Name, c.Name, mv.Name, mv.Duration, mv.MovieID, mv.Poster, mv.Age, tf.StartTime, tf.EndTime
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

module.exports = { getOrderByUser };
