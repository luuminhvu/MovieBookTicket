const SuccessResponse = require("../common/Response/Success");
const ErrorResponse = require("../common/Response/Error");
const db = require("../config/dbconfig");

const moment = require("moment-timezone");

const getRevenueAndTicketsByDay = async (req, res, next) => {
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
      COUNT(DISTINCT BookingID) AS NumberOfTickets,
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

    // Xử lý dữ liệu để đảm bảo rằng mỗi ngày trong khoảng thời gian có cả doanh thu và số vé bán ra
    const result = [];
    const currentDate = moment(currentDateVN);

    for (let i = 0; i < 7; i++) {
      const date = moment(currentDate).subtract(7 - i - 1, "days");
      const formattedDate = date.format("YYYY-MM-DD");
      const dayOfWeek = date.format("dddd"); // Lấy thứ của mỗi ngày

      const dayData = data.find((item) => item.BookingDay === formattedDate);
      const revenue = dayData ? dayData.Revenue : 0;
      const numberOfTickets = dayData ? dayData.NumberOfTickets : 0;

      result.push({
        Date: formattedDate,
        DayOfWeek: dayOfWeek,
        Revenue: revenue,
        NumberOfTickets: numberOfTickets,
      });
    }

    SuccessResponse(
      res,
      200,
      "Revenue and Tickets fetched successfully",
      result
    );
  } catch (error) {
    ErrorResponse(res, 500, "Internal Server Error", error);
  }
};
const getRevenueByDayOfMonth = async (req, res, next) => {
  try {
    const { year, month } = req.body; // Lấy năm và tháng từ yêu cầu

    // Xác định số ngày trong tháng
    const daysInMonth = moment(`${year}-${month}`, "YYYY-MM").daysInMonth();

    // Tạo một mảng chứa các ngày trong tháng và năm được chỉ định
    const daysOfMonth = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    // Tạo một mảng chứa doanh thu và số vé bán của mỗi ngày trong tháng và năm được chỉ định
    const result = await Promise.all(
      daysOfMonth.map(async (day) => {
        // Format ngày, tháng và năm thành chuỗi YYYY-MM-DD
        const formattedDate = `${year}-${month}-${day}`;

        // Truy vấn SQL để lấy doanh thu và số vé bán cho ngày cụ thể
        const q = `
          SELECT 
            COALESCE(SUM(TotalPrice), 0) AS Revenue,
            COALESCE(COUNT(NumberOfTickets), 0) AS NumberOfTickets
          FROM
            bookings
          WHERE
            DATE(BookingDate) = ?`;

        // Thực hiện truy vấn và lấy doanh thu và số vé bán
        const [row] = await new Promise((resolve, reject) => {
          db.query(q, [formattedDate], (err, data) => {
            if (err)
              return ErrorResponse(res, 500, "Internal Server Error", err);
            resolve(data);
          });
        });

        // Trả về doanh thu và số vé bán của ngày cụ thể trong tháng và năm được chỉ định
        return {
          Day: day,
          Revenue: row ? row.Revenue : 0,
          NumberOfTickets: row ? row.NumberOfTickets : 0,
        };
      })
    );

    SuccessResponse(
      res,
      200,
      "Revenue and Number of tickets by day of month fetched successfully",
      result
    );
  } catch (error) {
    ErrorResponse(res, 500, "Internal Server Error", error);
  }
};

const getTopMoviesByRevenue = async (req, res, next) => {
  try {
    const q = `
    SELECT 
      movies.MovieID,
      movies.Name,
      movies.Duration,
      movies.ReleaseDate,
      movies.Poster,
      COALESCE(SUM(bookings.TotalPrice), 0) AS Revenue,
      COALESCE(COUNT(bookings.BookingID), 0) AS NumberOfTicketsSold
    FROM
      movies
      LEFT JOIN showtimes ON movies.MovieID = showtimes.MovieID
      LEFT JOIN bookings ON showtimes.ShowtimeID = bookings.ShowtimeID
    GROUP BY
      movies.MovieID
    ORDER BY
      Revenue DESC
    LIMIT 3`;

    const data = await new Promise((resolve, reject) => {
      db.query(q, (err, data) => {
        if (err) return ErrorResponse(res, 500, "Internal Server Error", err);
        resolve(data);
      });
    });

    SuccessResponse(
      res,
      200,
      "Top 10 movies by revenue fetched successfully",
      data
    );
  } catch (error) {
    ErrorResponse(res, 500, "Internal Server Error", error);
  }
};
const getTopGenresByRevenue = async (req, res, next) => {
  try {
    const q = `
    SELECT
    movies.Genres,
    COUNT(bookings.BookingID) AS TotalTicketsSold
    FROM
        movies
    INNER JOIN showtimes ON movies.MovieID = showtimes.MovieID
    INNER JOIN bookings ON showtimes.ShowtimeID = bookings.ShowtimeID
    GROUP BY
        movies.Genres
    ORDER BY
        TotalTicketsSold DESC
    LIMIT 5;

    `;
    const data = await new Promise((resolve, reject) => {
      db.query(q, (err, data) => {
        if (err) return ErrorResponse(res, 500, "Internal Server Error", err);
        resolve(data);
      });
    });

    SuccessResponse(
      res,
      200,
      "Top 5 genres by revenue fetched successfully",
      data
    );
  } catch (error) {
    ErrorResponse(res, 500, "Internal Server Error", error);
  }
};
const getTopTimeFramesByRevenue = async (req, res, next) => {
  try {
    const q = `
    SELECT
    timeframes.TimeFrameID,
    timeframes.StartTime,
    COUNT(bookings.BookingID) AS TotalBookings
    FROM
        timeframes
    INNER JOIN showtimes ON timeframes.TimeFrameID = showtimes.TimeFrameID
    INNER JOIN bookings ON showtimes.ShowtimeID = bookings.ShowtimeID
    GROUP BY
        timeframes.TimeFrameID,
        timeframes.StartTime
    ORDER BY
        TotalBookings DESC
    LIMIT 5;
    `;
    const data = await new Promise((resolve, reject) => {
      db.query(q, (err, data) => {
        if (err) return ErrorResponse(res, 500, "Internal Server Error", err);
        resolve(data);
      });
    });

    SuccessResponse(
      res,
      200,
      "Top 5 time frames by revenue fetched successfully",
      data
    );
  } catch (error) {
    ErrorResponse(res, 500, "Internal Server Error", error);
  }
};

module.exports = {
  getRevenueAndTicketsByDay,
  getRevenueByDayOfMonth,
  getTopMoviesByRevenue,
  getTopGenresByRevenue,
  getTopTimeFramesByRevenue,
};
