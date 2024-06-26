const SuccessResponse = require("../common/Response/Success");
const ErrorResponse = require("../common/Response/Error");
const config = require("../config/vnpay.json");
const sortObject = require("../common/fn/sortObject");
const moment = require("moment");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();
const {
  PaymentIntoBooking,
  PaymentSuccess,
  PaymentInfo,
  sendMailOrder,
  PaymentInfoMomo,
  paymentInfoCash,
} = require("../common/fn/PaymentFn");
const {
  generateBookingId,
  generateTicketCode,
} = require("../common/fn/GenerateNumber");
const { deleteUserVoucher } = require("../common/fn/deleteVoucher");
const infoBooking = {};
const createPaymentRequest = async (req, res, next) => {
  process.env.TZ = "Asia/Ho_Chi_Minh";
  const userId = req.body.userId;
  infoBooking[userId] = req.body;
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
  let signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
  vnp_Params["vnp_SecureHash"] = signed;
  vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });
  SuccessResponse(res, 200, "Success", { code: "00", data: vnpUrl });
};
const getRequestReturn = async (req, res) => {
  try {
    const { userId } = req.body;
    let vnp_Params = req.query;
    if (!userId || !infoBooking[userId]) {
      return ErrorResponse(res, 400, "Invalid user or booking info", {
        code: "98",
      });
    }
    const secureHash = vnp_Params["vnp_SecureHash"];
    delete vnp_Params["vnp_SecureHash"];
    delete vnp_Params["vnp_SecureHashType"];

    vnp_Params = sortObject(vnp_Params);

    const tmnCode = config.vnp_TmnCode;
    const secretKey = config.vnp_HashSecret;
    const querystring = require("qs");
    const crypto = require("crypto");

    const signData = querystring.stringify(vnp_Params, { encode: false });
    const hmac = crypto.createHmac("sha512", secretKey);
    const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

    const bookingID = generateBookingId(8);
    const ticketCode = generateTicketCode(8);

    const info = infoBooking[userId];

    if (secureHash === signed) {
      if (vnp_Params["vnp_ResponseCode"] === "00") {
        await Promise.all([
          PaymentSuccess(info, bookingID, ticketCode),
          PaymentIntoBooking(info, bookingID),
          PaymentInfo(vnp_Params, bookingID),
          sendMailOrder(info, ticketCode),
          info.voucherId && deleteUserVoucher(info.voucherId), // Only include if voucherId exists
        ]);

        // Send success response
        SuccessResponse(res, 200, "Success", {
          code: vnp_Params["vnp_ResponseCode"],
        });
      } else {
        ErrorResponse(res, 400, "Fail", {
          code: vnp_Params["vnp_ResponseCode"],
        });
      }
    } else {
      ErrorResponse(res, 400, "Fail", { code: "97" });
    }

    infoBooking[userId] = null;
  } catch (error) {
    console.error("Error processing payment:", error);
    ErrorResponse(res, 400, "Fail", { code: "97" });
    if (req.body.userId) {
      infoBooking[req.body.userId] = null;
    }
  }
};

const createPaymentRequestMomo = async (req, res, next) => {
  const userId = req.body.userId;
  infoBooking[userId] = req.body;
  let accessKey = "F8BBA842ECF85";
  let secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
  let orderInfo = "pay with MoMo";
  let partnerCode = "MOMO";
  let redirectUrl = `${process.env.HOST}/payment/result/momo`;
  let ipnUrl = "https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b";
  let requestType = "payWithMethod";
  let amount = req.body.total;
  let orderId = partnerCode + new Date().getTime();
  let requestId = orderId;
  let extraData = "";
  let orderGroupId = "";
  let autoCapture = true;
  let lang = "vi";
  //before sign HMAC SHA256 with format
  //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
  let rawSignature =
    "accessKey=" +
    accessKey +
    "&amount=" +
    amount +
    "&extraData=" +
    extraData +
    "&ipnUrl=" +
    ipnUrl +
    "&orderId=" +
    orderId +
    "&orderInfo=" +
    orderInfo +
    "&partnerCode=" +
    partnerCode +
    "&redirectUrl=" +
    redirectUrl +
    "&requestId=" +
    requestId +
    "&requestType=" +
    requestType;
  //puts raw signature
  // console.log("--------------------RAW SIGNATURE----------------");
  // console.log(rawSignature);
  //signature
  const crypto = require("crypto");
  let signature = crypto
    .createHmac("sha256", secretKey)
    .update(rawSignature)
    .digest("hex");
  // console.log("--------------------SIGNATURE----------------");
  // console.log(signature);

  //json object send to MoMo endpoint
  const requestBody = JSON.stringify({
    partnerCode: partnerCode,
    partnerName: "Test",
    storeId: "MomoTestStore",
    requestId: requestId,
    amount: amount,
    orderId: orderId,
    orderInfo: orderInfo,
    redirectUrl: redirectUrl,
    ipnUrl: ipnUrl,
    lang: lang,
    requestType: requestType,
    autoCapture: autoCapture,
    extraData: extraData,
    orderGroupId: orderGroupId,
    signature: signature,
  });
  //Create the HTTPS objects

  const options = {
    method: "POST",
    url: "https://test-payment.momo.vn/v2/gateway/api/create",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(requestBody),
    },
    data: requestBody,
  };
  let result;
  try {
    result = await axios(options);
    SuccessResponse(res, 200, "Success", { code: "00", data: result.data });
  } catch (error) {
    console.log(error);
    ErrorResponse(res, 400, "Fail", { code: "97" });
  }
};
const getRequestReturnMomo = async (req, res) => {
  try {
    const { userId } = req.body;
    const info = infoBooking[userId];
    const data = req.query;
    if (!userId || !info) {
      return ErrorResponse(res, 400, "Invalid user or booking info", {
        code: "98",
      });
    }
    if (data.resultCode === "0") {
      const bookingID = generateBookingId(8);
      const ticketCode = generateTicketCode(8);

      await Promise.all([
        PaymentSuccess(info, bookingID, ticketCode),
        PaymentIntoBooking(info, bookingID),
        PaymentInfoMomo(data, bookingID),
        sendMailOrder(info, ticketCode),
        info.voucherId && deleteUserVoucher(info.voucherId), // Only include if voucherId exists
      ]);
      SuccessResponse(res, 200, "Success", { code: data.resultCode });

      infoBooking[userId] = null;
    } else {
      ErrorResponse(res, 400, "Fail", { code: "97" });
      infoBooking[userId] = null;
    }
  } catch (error) {
    console.error("Error processing Momo payment:", error);
    ErrorResponse(res, 400, "Fail", { code: "97" });
    if (req.body.userId) {
      infoBooking[req.body.userId] = null;
    }
  }
};

const paymentRequestCash = async (req, res) => {
  try {
    const cashBooking = req.body;

    if (!cashBooking || Object.keys(cashBooking).length === 0) {
      return ErrorResponse(res, 400, "Invalid booking details", { code: "98" });
    }
    const bookingID = generateBookingId(8);
    const ticketCode = generateTicketCode(8);

    await Promise.all([
      PaymentSuccess(cashBooking, bookingID, ticketCode),
      PaymentIntoBooking(cashBooking, bookingID),
      paymentInfoCash(cashBooking, bookingID),
      cashBooking.voucherId && deleteUserVoucher(cashBooking.voucherId), // Only include if voucherId exists
    ]);

    SuccessResponse(res, 200, "Đặt vé thành công", { code: "00" });
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "Unknown error";
    ErrorResponse(res, 400, `Đặt vé thất bại: ${errorMessage}`, { code: "97" });
  }
};

module.exports = {
  createPaymentRequest,
  getRequestReturn,
  createPaymentRequestMomo,
  getRequestReturnMomo,
  paymentRequestCash,
};
