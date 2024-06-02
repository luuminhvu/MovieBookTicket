const ErrorResponse = require("../common/Response/Error");
const db = require("../config/dbconfig");

const checkSeats = async (req, res, next) => {
  const seatIds = req.body.seatId;
  const showtimeId = req.body.showtimeId;

  if (!Array.isArray(seatIds) || seatIds.length === 0) {
    return ErrorResponse(res, 400, "Invalid seat IDs");
  }

  const q = `SELECT * FROM showseats WHERE CinemaSeatID IN (${seatIds.join(
    ","
  )}) AND ShowtimeID = ${showtimeId}`;

  try {
    const data = await new Promise((resolve, reject) => {
      db.query(q, (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });

    if (data.length !== seatIds.length) {
      return ErrorResponse(res, 404, "Some seats are not found");
    }

    for (const seat of data) {
      if (seat.BookingID !== null || seat.SeatStatus !== "EMPTY") {
        return ErrorResponse(res, 400, "Ghế đã được đặt hoặc không còn trống");
      }
    }
    const updateQ = `UPDATE showseats SET SeatStatus = 'LOCKED' WHERE CinemaSeatID IN (${seatIds.join(
      ","
    )}) AND ShowtimeID = ${showtimeId}`;
    await new Promise((resolve, reject) => {
      db.query(updateQ, (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
    next();
  } catch (error) {
    ErrorResponse(res, 500, "Internal Server Error", error);
  }
};

module.exports = { checkSeats };
