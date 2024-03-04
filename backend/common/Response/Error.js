// errorResponse.js
const ErrorResponse = (res, statusCode, message, data) => {
  res.status(statusCode).json({
    status: "error",
    message: message,
    data: data,
  });
};

module.exports = ErrorResponse;
