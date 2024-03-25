const db = require("../../config/dbconfig");
const PaymentIntoBooking = async (inf, bookingID) => {
  try {
    const bookingId = bookingID;
    const seatId = inf.seatId;
    const ShowtimeID = inf.showtimeId;
    const SeatStatus = "BOOKED";
    const q = `UPDATE ShowSeats SET SeatStatus = '${SeatStatus}', BookingID = ${bookingId}
     WHERE ShowtimeID = ${ShowtimeID} AND CinemaSeatID IN (${seatId.join(
      ","
    )})`;
    const data = await new Promise((resolve, reject) => {
      db.query(q, (err, data) => {
        if (err) return ErrorResponse(res, 500, "Internal Server Error", err);
        resolve(data);
      });
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = { PaymentIntoBooking };
