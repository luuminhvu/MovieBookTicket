const db = require("../../config/dbconfig");
const dayjs = require("dayjs");
const nodemailer = require("nodemailer");
const sendMail = require("../../utils/sendMail");
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
// inf {
//   userId: 42600279,
//   bankCode: '',
//   total: 55000,
//   movieId: 1,
//   seatId: [ 28 ],
//   showtimeId: 12,
//   cinemaName: 'Rạp Đống Đa',
//   cinemaHallName: 'Phòng chiếu 1',
//   startTime: '12:00:00',
//   date: '2024-05-06',
//   email: 'axv04707@ilebi.com'
// }
const sendMailOrder = async (inf, ticketCode) => {
  const to = inf.email;
  const subject = "Movie Book Ticket - Order";
  const text = "Order";
  try {
    const q1 = `SELECT * FROM movies WHERE MovieID = ${inf.movieId}`;
    const q3 = `SELECT * FROM cinemaseats WHERE CinemaSeatID IN (${inf.seatId.join(
      ","
    )})`;
    const data = await new Promise((resolve, reject) => {
      db.query(q1, (err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });

    const data3 = await new Promise((resolve, reject) => {
      db.query(q3, (err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });
    const movieName = data[0].Name;
    const datePayment = dayjs().format("YYYY-MM-DD HH:mm:ss");
    const cinemaName = inf.cinemaName;
    const cinemaHallName = inf.cinemaHallName;
    const startTime = inf.startTime;
    const date = inf.date;
    const seatNames = data3.map((seat) => seat.SeatName).join(", ");
    const totalPrice = inf.total;
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Ticket Information</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: auto;
          border: 1px solid #ccc;
          padding: 20px;
        }
        .header {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 20px;
        }
        .location {
          font-style: italic;
          margin-bottom: 20px;
        }
        .reservation-code {
          font-weight: bold;
          margin-bottom: 10px;
          text-align:center;
        }
        .ticket-code{
        text-align: center;
        margin-bottom: 10px;
        }
        .session {
          margin-bottom: 20px;
          text-align: center;
        }
        .qr-code {
          text-align: center;
          margin-top: 20px;
        }
        .info {
          margin-bottom: 20px;
        }
        .column {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
        }
        .label {
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header"> ${movieName} 
        </div>
        <div class="location">
          ${cinemaName}<br>
          Tầng 4 Lotte Mall West Lake Hanoi, 683 đường Lạc Long Quân, Tây Hồ, Hà Nội, Hanoi, Vietnam
        </div>
        <div class="reservation-code">MÃ VÉ (RESERVATION CODE)</div>
        <div class="ticket-code">${ticketCode}</div>
        <div class="session">
          SUẤT CHIẾU (SESSION)<br>
          ${date} ${startTime}
        </div>
        <div class="qr-code">
          <!-- Thêm hình ảnh QR code -->
          <img src="https://api.qrserver.com/v1/create-qr-code/?data=${ticketCode}&amp;size=100x100" alt="QR Code">
        </div>
        <div class="info">
          <div class="column">
            <div class="label">Phòng chiếu: </div>
            <div>
              ${cinemaHallName}
            </div>
          </div>
          <div class="column">
            <div class="label">Ghế: </div>
            <div> ${seatNames}</div>
            </div>
          </div>
          <div class="column">
            <div class="label">Thời gian thanh toán: </div>
            <div>
              ${datePayment}
            </div>
          </div>
          <div class="column">
            <div class="label">Tiền combo bỏng nước: </div>
            <div>0 VND</div>
          </div>
          <div class="column">
            <div class="label">Tổng tiền: </div>
            <div>0 VND</div>
          </div>
          <div class="column">
            <div class="label">Số tiền giảm giá: </div>
            <div>0 VND</div>
          </div>
          <div class="column">
            <div class="label">Số tiền thanh toán: </div>
            <div> ${totalPrice} VND</div>
          </div>
        </div>
        <div class="note">
          <p><strong>Lưu ý / Note:</strong></p>
          <p>Vé đã mua không thể hủy, đổi hoặc trả lại. Vui lòng liên hệ Ban Quản Lý rạp hoặc tra cứu thông tin tại mục Điều khoản mua và sử dụng vé xem phim để biết thêm chi tiết. Cảm ơn bạn đã lựa chọn mua vé qua Ứng dụng Ví điện tử. Chúc bạn xem phim vui vẻ!</p>
          <p><em>The successful movie ticket cannot be canceled, exchanged or refunded. If you have any question or problems with this order, you can contact Theater Manager or see our Conditon to purchase an use movie tickets for more infomation. Thanks you for choosing Ứng dụng Ví điện tử and Enjoy the movie!</em></p>
        </div>
      </div>
    </body>
    </html>`;
    await sendMail(to, subject, text, html);
  } catch (error) {
    console.log(error);
  }
};
const PaymentInfoMomo = async (inf, bookingID) => {
  // {
  //   partnerCode: 'MOMO',
  //   orderId: 'MOMO1716654083938',
  //   requestId: 'MOMO1716654083938',
  //   amount: '50000',
  //   orderInfo: 'pay with MoMo',
  //   orderType: 'momo_wallet',
  //   transId: '4048405660',
  //   resultCode: '0',
  //   message: 'Successful.',
  //   payType: 'napas',
  //   responseTime: '1716655113850',
  //   extraData: '',
  //   signature: '0117b327105b578f93e2f4cd4654c91138a62a14065f79e5521f7625864a0ff8'
  // }
  try {
    const { partnerCode, orderId, requestId, amount, orderInfo, payType } = inf;
    const date = dayjs().format("YYYY-MM-DD HH:mm:ss");
    const q = `INSERT INTO payments (BookingID,PaymentDate,Amount,PaymentStatus,PaymentMethod,PaymentInfo,TransactionID,TransactionNo,BankCode,CardType)
                VALUES (${bookingID},'${date}',${amount},'0','${partnerCode}','${orderInfo}','${requestId}','${orderId}','MOMO','${payType}')`;
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

module.exports = {
  PaymentIntoBooking,
  PaymentSuccess,
  PaymentInfo,
  sendMailOrder,
  PaymentInfoMomo,
};
