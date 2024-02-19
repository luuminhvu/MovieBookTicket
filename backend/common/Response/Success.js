const SuccessResponse = (res, statusCode, message) => {
  res.status(statusCode).json({
    status: "success",
    message: message,
  });
};

module.exports = SuccessResponse;
