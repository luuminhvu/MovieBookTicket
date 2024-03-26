const SuccessResponse = require("../common/Response/Success");
const ErrorResponse = require("../common/Response/Error");
const config = require("../config/vnpay.json");
const sortObject = require("../common/fn/sortObject");
const moment = require("moment");
const {
  PaymentIntoBooking,
  PaymentSuccess,
} = require("../common/fn/PaymentFn");
const {
  generateBookingId,
  generateTicketCode,
} = require("../common/fn/GenerateNumber");
const infoBooking = [];
const createPaymentRequest = async (req, res, next) => {
  process.env.TZ = "Asia/Ho_Chi_Minh";
  infoBooking.push(req.body);
  let date = new Date();
  let createDate = moment(date).format("YYYYMMDDHHmmss");

  let ipAddr =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  let tmnCode = config.vnp_TmnCode;
  let secretKey = config.vnp_HashSecret;
  let vnpUrl = config.vnp_Url;
  let returnUrl = config.vnp_ReturnUrl;
  let orderId = moment(date).format("DDHHmmss");
  let amount = req.body.total;
  let bankCode = req.body.bankCode;
  let locale = req.body.currentLanguage;
  if (locale === null || locale === "" || locale === undefined) {
    locale = "vn";
  }
  let currCode = "VND";
  let vnp_Params = {};
  vnp_Params["vnp_Version"] = "2.1.0";
  vnp_Params["vnp_Command"] = "pay";
  vnp_Params["vnp_TmnCode"] = tmnCode;
  vnp_Params["vnp_Locale"] = locale;
  vnp_Params["vnp_CurrCode"] = currCode;
  vnp_Params["vnp_TxnRef"] = orderId;
  vnp_Params["vnp_OrderInfo"] = "Thanh toan cho ma GD:" + orderId;
  vnp_Params["vnp_OrderType"] = "other";
  vnp_Params["vnp_Amount"] = amount * 100;
  vnp_Params["vnp_ReturnUrl"] = returnUrl;
  vnp_Params["vnp_IpAddr"] = ipAddr;
  vnp_Params["vnp_CreateDate"] = createDate;
  if (bankCode !== null && bankCode !== "") {
    vnp_Params["vnp_BankCode"] = bankCode;
  }
  vnp_Params = sortObject(vnp_Params);
  let querystring = require("qs");
  let signData = querystring.stringify(vnp_Params, { encode: false });
  let crypto = require("crypto");
  let hmac = crypto.createHmac("sha512", secretKey);
  let signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
  vnp_Params["vnp_SecureHash"] = signed;
  vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });
  SuccessResponse(res, 200, "Success", { code: "00", data: vnpUrl });
};
const getRequestReturn = async (req, res) => {
  let vnp_Params = req.query;
  let secureHash = vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHashType"];
  vnp_Params = sortObject(vnp_Params);
  let tmnCode = config.vnp_TmnCode;
  let secretKey = config.vnp_HashSecret;

  let querystring = require("qs");
  let signData = querystring.stringify(vnp_Params, { encode: false });
  let crypto = require("crypto");
  let hmac = crypto.createHmac("sha512", secretKey);
  let signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
  const bookingID = generateBookingId(8);
  const ticketCode = generateTicketCode(8);
  if (secureHash === signed) {
    await PaymentSuccess(infoBooking[0], bookingID, ticketCode);
    await PaymentIntoBooking(infoBooking[0], bookingID);
    SuccessResponse(res, 200, "Success", {
      code: vnp_Params["vnp_ResponseCode"],
    });
    infoBooking.slice(0, 1);
  } else {
    ErrorResponse(res, 400, "Fail", { code: "97" });
  }
  infoBooking.slice(0, infoBooking.length);
};
module.exports = { createPaymentRequest, getRequestReturn };
