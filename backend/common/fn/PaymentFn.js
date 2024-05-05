const db = require("../../config/dbconfig");
const dayjs = require("dayjs");
const PaymentIntoBooking = async (inf, bookingID) => {
  try {
    const { seatId, showtimeId } = inf;
    const SeatStatus = "BOOKED";
    const q = `UPDATE showseats 
               SET SeatStatus = '${SeatStatus}', BookingID = ${bookingID}
               WHERE ShowtimeID = ${showtimeId} AND CinemaSeatID IN (${seatId.join(
      ","
    )})`;
    const data = new Promise((resolve, reject) =>
      db.query(q, (err, data) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        resolve(data);
      })
    );
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const PaymentSuccess = async (inf, bookingID, ticketCode) => {
  try {
    const { total, showtimeId, userId } = inf;
    const date = dayjs().format("YYYY-MM-DD HH:mm:ss");
    const q = `INSERT INTO bookings (BookingID,CustomerID,ShowtimeID,TotalPrice,BookingDate,NumberOfTickets) 
               VALUES (${bookingID},${userId},${showtimeId},${total},'${date}','${ticketCode}')`;
    const data = new Promise((resolve, reject) =>
      db.query(q, (err, data) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        resolve(data);
      })
    );
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
const PaymentInfo = async (inf, bookingID) => {
  try {
    // {
    //   vnp_Amount: '5000000',
    //   vnp_BankCode: 'NCB',
    //   vnp_BankTranNo: 'VNP14359132',
    //   vnp_CardType: 'ATM',
    //   vnp_OrderInfo: 'Thanh+toan+cho+ma+GD%3A28212624',
    //   vnp_PayDate: '20240328212637',
    //   vnp_ResponseCode: '00',
    //   vnp_TmnCode: '655QCR74',
    //   vnp_TransactionNo: '14359132',
    //   vnp_TransactionStatus: '00',
    //   vnp_TxnRef: '28212624'
    // }
    const {
      vnp_Amount,
      vnp_BankCode,
      vnp_BankTranNo,
      vnp_CardType,
      vnp_OrderInfo,
      vnp_PayDate,
      vnp_ResponseCode,
      vnp_TmnCode,
      vnp_TransactionNo,
      vnp_TransactionStatus,
      vnp_TxnRef,
    } = inf;
    const date = dayjs().format("YYYY-MM-DD HH:mm:ss");
    const q = `INSERT INTO payments (BookingID,PaymentDate,Amount,PaymentStatus,PaymentMethod,PaymentInfo,TransactionID,TransactionNo,BankCode,CardType)
                VALUES (${bookingID},'${date}',${vnp_Amount},'${vnp_ResponseCode}','VNPAY','${vnp_OrderInfo}','${vnp_TxnRef}','${vnp_TransactionNo}','${vnp_BankCode}','${vnp_CardType}')`;
    const data = new Promise((resolve, reject) =>
      db.query(q, (err, data) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        resolve(data);
      })
    );
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { PaymentIntoBooking, PaymentSuccess, PaymentInfo };
