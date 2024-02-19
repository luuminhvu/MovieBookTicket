// errorResponse.js
const ErrorResponse = (res, statusCode, message) => {
  res.status(statusCode).json({
    status: "error",
    message: message,
  });
};

module.exports = ErrorResponse;
