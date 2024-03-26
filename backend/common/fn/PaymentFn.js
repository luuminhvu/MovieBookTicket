const db = require("../../config/dbconfig");
const dayjs = require("dayjs");
const PaymentIntoBooking = async (inf, bookingID) => {
  try {
    const { seatId, showtimeId } = inf;
    const SeatStatus = "BOOKED";
    const q = `UPDATE ShowSeats 
               SET SeatStatus = '${SeatStatus}', BookingID = ${bookingID}
               WHERE ShowtimeID = ${showtimeId} AND CinemaSeatID IN (${seatId.join(
      ","
    )})`;
    const data = await db.query(q);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const PaymentSuccess = async (inf, bookingID, ticketCode) => {
  try {
    const { total, showtimeId, userId } = inf;
    const date = dayjs().format("YYYY-MM-DD HH:mm:ss");
    const q = `INSERT INTO Bookings (BookingID,CustomerID,ShowtimeID,TotalPrice,BookingDate,NumberOfTickets) 
               VALUES (${bookingID},${userId},${showtimeId},${total},'${date}','${ticketCode}')`;
    const data = await db.query(q);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { PaymentIntoBooking, PaymentSuccess };
