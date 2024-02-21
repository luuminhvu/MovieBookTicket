const SuccessResponse = (res, statusCode, message, data) => {
  res.status(statusCode).json({
    status: "success",
    message: message,
    data: data,
  });
};

module.exports = SuccessResponse;
