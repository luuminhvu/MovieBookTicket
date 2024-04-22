const SuccessResponse = require("../common/Response/Success");
const ErrorResponse = require("../common/Response/Error");
const db = require("../config/dbconfig");

const moment = require("moment-timezone");

const getRevenueByDay = async (req, res, next) => {
  try {
    const currentDateVN = moment().tz("Asia/Ho_Chi_Minh").startOf("day");

    // Lấy thời gian 7 ngày trước đồng thời đảm bảo là thứ 2
    const sevenDaysAgoVN = moment(currentDateVN).subtract(7, "days");
    if (sevenDaysAgoVN.isoWeekday() !== 1) {
      sevenDaysAgoVN.isoWeekday(1); // Đảm bảo ngày 7 ngày trước là thứ 2
    }

    // Lấy ngày hiện tại và 7 ngày trước dưới dạng chuỗi YYYY-MM-DD
    const currentDateStr = currentDateVN.format("YYYY-MM-DD");
    const sevenDaysAgoStr = sevenDaysAgoVN.format("YYYY-MM-DD");

    const q = `
    SELECT 
      SUM(TotalPrice) AS Revenue,
      DATE_FORMAT(BookingDate, '%Y-%m-%d') AS BookingDay
    FROM
        Bookings
    WHERE
        BookingDate >= ? AND BookingDate <= ?
    GROUP BY
        BookingDay
    ORDER BY
        BookingDay`;

    const data = await new Promise((resolve, reject) => {
      db.query(q, [sevenDaysAgoStr, currentDateStr], (err, data) => {
        if (err) return ErrorResponse(res, 500, "Internal Server Error", err);
        resolve(data);
      });
    });
    const result = [];
    const currentDate = moment(currentDateVN);

    for (let i = 0; i < 7; i++) {
      const date = moment(currentDate).subtract(7 - i - 1, "days");
      const formattedDate = date.format("YYYY-MM-DD");
      const dayOfWeek = date.format("dddd"); // Lấy thứ của mỗi ngày

      const revenueData = data.find(
        (item) => item.BookingDay === formattedDate
      );
      const revenue = revenueData ? revenueData.Revenue : 0;

      result.push({
        Date: formattedDate,
        DayOfWeek: dayOfWeek,
        Revenue: revenue,
      });
    }

    SuccessResponse(res, 200, "Revenue fetched successfully", result);
  } catch (error) {
    ErrorResponse(res, 500, "Internal Server Error", error);
  }
};

module.exports = { getRevenueByDay };
