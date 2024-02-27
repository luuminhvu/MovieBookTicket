// errorResponse.js
const ErrorResponse = (res, statusCode, message) => {
  res.status(statusCode).json({
    status: "error",
    message: message,
    type: "error",
  });
};

module.exports = ErrorResponse;
