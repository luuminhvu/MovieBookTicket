const requestTimeout = (timeout) => {
  return (req, res, next) => {
    // Thiết lập thời gian chờ cho yêu cầu
    const requestTimer = setTimeout(() => {
      const error = new Error("Request Timeout");
      error.status = 408; // HTTP status code for Request Timeout
      next(error); // Chuyển giao cho middleware xử lý lỗi
    }, timeout);

    // Bắt sự kiện kết thúc của yêu cầu
    res.on("finish", () => {
      clearTimeout(requestTimer); // Hủy bỏ thời gian chờ nếu yêu cầu hoàn thành trước thời gian chờ
    });

    next(); // Chuyển giao cho middleware tiếp theo trong chuỗi middleware
  };
};

module.exports = requestTimeout;
