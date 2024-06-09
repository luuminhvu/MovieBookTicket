/* eslint-disable eqeqeq */
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserVouchers } from "../../stores/voucherSlice";
import { setLoading } from "../../stores/loadingSlice";
import { showToast } from "../../components/common/Toast";
import { useTranslation } from "react-i18next";
const Checkout = () => {
  const userId = useSelector((state) => state.auth.userId);
  const role = useSelector((state) => state.auth.role);
  const email = useSelector((state) => state.auth.email);
  const voucher = useSelector((state) => state.voucher.userVoucher);
  const { t } = useTranslation();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [agree, setAgree] = useState(false);
  const [voucherDiscount, setVoucherDiscount] = useState(0);
  const [userVoucherID, setUserVoucherID] = useState(null);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    bookingSeats,
    movie,
    cinemaName,
    cinemaHallName,
    startTime,
    date,
    showTimeID,
  } = location.state;
  const [secondsLeft, setSecondsLeft] = useState(300);
  const total =
    bookingSeats
      .map((seat) => parseFloat(seat.Price))
      .reduce((a, b) => a + b, 0) -
    (bookingSeats
      .map((seat) => parseFloat(seat.Price))
      .reduce((a, b) => a + b, 0) *
      parseFloat(voucherDiscount)) /
      100;
  const originalTotal = bookingSeats
    .map((seat) => parseFloat(seat.Price))
    .reduce((a, b) => a + b, 0);
  const handleCheckout = async (e) => {
    if (paymentMethod === "vnpay") {
      try {
        const res = await api.post("/payment", {
          userId,
          bankCode: "",
          total,
          originalTotal,
          movieId: movie.MovieID,
          seatId: bookingSeats.map((seat) => seat.CinemaSeatID),
          showtimeId: showTimeID,
          cinemaName,
          cinemaHallName,
          startTime,
          date,
          email,
          discount: voucherDiscount,
          voucherId: userVoucherID,
        });
        window.location.href = res.data.data.data;
      } catch (error) {
        showToast(error.response.data.message, "error");
      }
    } else if (paymentMethod === "momo") {
      try {
        const res = await api.post("/payment/momo", {
          userId,
          total,
          originalTotal,
          movieId: movie.MovieID,
          seatId: bookingSeats.map((seat) => seat.CinemaSeatID),
          showtimeId: showTimeID,
          cinemaName,
          cinemaHallName,
          startTime,
          date,
          email,
          discount: voucherDiscount,
          voucherId: userVoucherID,
        });
        window.location.href = res.data.data.data.payUrl;
      } catch (error) {
        showToast(error.response.data.message, "error");
      }
    } else if (paymentMethod === "cash") {
      try {
        const res = await api.post("/payment/cash", {
          userId,
          total,
          originalTotal,
          movieId: movie.MovieID,
          seatId: bookingSeats.map((seat) => seat.CinemaSeatID),
          showtimeId: showTimeID,
          cinemaName,
          cinemaHallName,
          startTime,
          date,
          email,
          discount: voucherDiscount,
          voucherId: userVoucherID,
        });
        showToast(res.data.message, res.data.status);
        navigate("/orders");
      } catch (error) {
        showToast(error.response.data.message, "error");
      }
    } else {
      e.preventDefault();
      alert("Thanh toán bằng thẻ tạm thời không khả dụng");
    }
  };
  const handleSelectVoucher = (userVoucherID) => {
    if (userVoucherID === "0") {
      setVoucherDiscount(0);
      return;
    }
    const selectedVoucher = voucher.find(
      (v) => v.UserVoucherID == userVoucherID
    );
    if (selectedVoucher) {
      setVoucherDiscount(selectedVoucher.Discount);
      setUserVoucherID(selectedVoucher.UserVoucherID);
    } else {
      setVoucherDiscount(0);
      setUserVoucherID(null);
    }
  };
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prevSecondsLeft) => {
        if (prevSecondsLeft === 0) {
          clearInterval(timer);
          navigate("/");
        }
        return prevSecondsLeft - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [navigate]);
  useEffect(() => {
    const getUserVoucher = async () => {
      dispatch(setLoading(true));
      try {
        await dispatch(fetchUserVouchers(userId));
        dispatch(setLoading(false));
      } catch (error) {
        console.log(error);
      }
    };
    getUserVoucher();
  }, [dispatch, userId]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");

  return (
    <div className="font-[sans-serif] bg-gray-50 p-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-[#333] text-center">
          {t("payment")}
        </h2>
        <div className="grid lg:grid-cols-3 gap-8 mt-12">
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold text-[#333]">
              {t("choosePaymentMethod")}
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 mt-6">
              <div className="flex items-center">
                <input
                  type="radio"
                  className="w-5 h-5 cursor-pointer"
                  id="card"
                  checked={paymentMethod === "card"}
                  onChange={() => setPaymentMethod("card")}
                />
                <label for="card" className="ml-4 flex gap-2 cursor-pointer">
                  <img
                    src="https://readymadeui.com/images/visa.webp"
                    className="w-12"
                    alt="card1"
                  />
                  <img
                    src="https://readymadeui.com/images/american-express.webp"
                    className="w-12"
                    alt="card2"
                  />
                  <img
                    src="https://readymadeui.com/images/master.webp"
                    className="w-12"
                    alt="card3"
                  />
                  <span
                    className="text-sm text-red-500 align-center
                  "
                  >
                    ( Bảo trì )
                  </span>
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  className="w-5 h-5 cursor-pointer"
                  id="vnpay"
                  checked={paymentMethod === "vnpay"}
                  onChange={() => setPaymentMethod("vnpay")}
                />
                <label for="vnpay" className="ml-4 flex gap-2 cursor-pointer">
                  <img
                    src="data:image/png;base64,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"
                    className="w-20"
                    alt="vnpay"
                  />
                </label>
              </div>
              {role === "admin" && (
                <div className="flex items-center">
                  <input
                    type="radio"
                    className="w-5 h-5 cursor-pointer"
                    id="cash"
                    checked={paymentMethod === "cash"}
                    onChange={() => setPaymentMethod("cash")}
                  />
                  <label for="cash" className="ml-4 flex gap-2 cursor-pointer">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyTBQpz8vH3IDp2mFiUUDco_aQNVoE8ntN7g&s"
                      className="w-20"
                      alt="cash"
                    />
                    <span
                      className="text-sm text-red-500 align-center
                  "
                    >
                      ( Admin / Employee )
                    </span>
                  </label>
                </div>
              )}
              <div className="flex items-center">
                <input
                  type="radio"
                  className="w-5 h-5 cursor-pointer"
                  id="momo"
                  checked={paymentMethod === "momo"}
                  onChange={() => setPaymentMethod("momo")}
                />
                <label for="momo" className="ml-4 flex gap-2 cursor-pointer">
                  <img
                    src="data:image/png;base64,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"
                    className="w-10"
                    alt="momo"
                  />
                </label>
              </div>
            </div>
            {paymentMethod === "card" && (
              <form className="mt-8">
                <div className="grid gap-6">
                  <div className="grid sm:grid-cols-3 gap-6">
                    <input
                      type="number"
                      placeholder="Card number"
                      className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border rounded-md focus:border-[#007bff] outline-none"
                    />
                    <input
                      type="number"
                      placeholder="EXP."
                      className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border rounded-md focus:border-[#007bff] outline-none"
                    />
                    <input
                      type="number"
                      placeholder="CVV"
                      className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border rounded-md focus:border-[#007bff] outline-none"
                    />
                  </div>
                  <div className="sm:col-span-2 grid sm:grid-cols-2 gap-6">
                    <input
                      type="text"
                      placeholder="Name of card holder"
                      className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border rounded-md focus:border-[#007bff] outline-none"
                    />
                    <input
                      type="number"
                      placeholder="Postal code"
                      className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border rounded-md focus:border-[#007bff] outline-none"
                    />
                  </div>
                </div>
              </form>
            )}
          </div>
          <div className="lg:border-l lg:pl-8">
            <h3 className="text-xl font-bold text-[#333]">
              {t("orderInformation")}
            </h3>
            <ul className="text-[#333] mt-6 space-y-4">
              <li className="flex flex-wrap gap-4 text-sm">
                {t("ticketPrice")}{" "}
                <span className="ml-auto font-bold">
                  {bookingSeats
                    .map((seat) => parseFloat(seat.Price))
                    .reduce((a, b) => a + b, 0)}{" "}
                  đ
                </span>
              </li>
              <li className="flex flex-wrap gap-4 text-sm">
                {t("chooseVoucher")}{" "}
                <select
                  className="border rounded-md px-2 py-1 ml-auto bg-white hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ease-in-out leading-6"
                  onChange={(e) => handleSelectVoucher(e.target.value)}
                >
                  <option value="0">{t("doNotUseVoucher")}</option>
                  {voucher.length > 0 &&
                    voucher.map((voucher) => (
                      <option
                        key={voucher.UserVoucherID}
                        value={voucher.UserVoucherID}
                      >
                        {voucher?.VoucherCode}
                      </option>
                    ))}
                </select>
              </li>
              <li className="flex flex-wrap gap-4 text-sm">
                {t("discount")}{" "}
                <span className="ml-auto font-bold">
                  {(bookingSeats
                    .map((seat) => parseFloat(seat.Price))
                    .reduce((a, b) => a + b, 0) *
                    parseFloat(voucherDiscount)) /
                    100}{" "}
                  đ{" "}
                </span>
              </li>
              <li className="flex flex-wrap gap-4 text-sm">
                {t("combo")} <span className="ml-auto font-bold">0 đ</span>
              </li>
              <li className="flex flex-wrap gap-4 text-base font-bold border-t pt-4">
                <span className="text-red-600">{t("totalPayment")}</span>
                <span className="ml-auto">
                  {bookingSeats
                    .map((seat) => parseFloat(seat.Price))
                    .reduce((a, b) => a + b, 0) -
                    (bookingSeats
                      .map((seat) => parseFloat(seat.Price))
                      .reduce((a, b) => a + b, 0) *
                      parseFloat(voucherDiscount)) /
                      100}{" "}
                  đ VNĐ
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex items-stretch mt-8 bg-slate-800 p-4 rounded-lg">
          <div className="flex flex-col items-center w-1/3">
            <div className="grid grid-cols-2">
              <div className="flex flex-col justify-center">
                <img
                  src={movie.Poster}
                  alt={movie.Name}
                  className="w-24 h-36 mt-4"
                />
              </div>
              <div className="flex flex-col justify-center items-center text-center">
                <p className="text-white">{movie.Name}</p>
                <p className="text-white">T{movie.Age}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col font-bold items-center w-1/3 border-r border-l border-slate-700">
            <div className="grid grid-cols-2">
              <div className="flex flex-col">
                <p className="text-white">{t("theater")}: </p>
                <p className="text-white">{t("hall")}: </p>
                <p className="text-white">{t("day")}: </p>
                <p className="text-white">{t("time")}: </p>
                <p className="text-white">{t("seat")}: </p>
              </div>
              <div className="flex flex-col">
                <p className="text-white">{cinemaName}</p>
                <p className="text-white">{cinemaHallName}</p>
                <p className="text-white">{dayjs(date).format("DD/MM/YYYY")}</p>
                <p className="text-white">{startTime.slice(0, 5)}</p>
                <p className="text-white">
                  {bookingSeats
                    .map((seat) => seat.SeatType + " " + seat.SeatName + " ")
                    .join(", ")}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col font-bold w-1/3">
            <div className="text-center">
              <div className="text-white">{t("remainToPayment")}:</div>
              <div className="flex items-center justify-center mt-2">
                <div className="bg-red-500 text-black border rounded-lg p-4 mr-1">
                  <span className="text-lg text-white">{formattedMinutes}</span>
                </div>
                <span className="text-white">:</span>
                <div className="bg-red-500 text-black border rounded-lg p-4 ml-1">
                  <span className="text-lg text-white">{formattedSeconds}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <div className="">
            <input
              onChange={() => setAgree(!agree)}
              type="checkbox"
              name="agree"
              id="agree"
              className="mr-2"
            />
            <label for="agree" className="text-sm">
              {t("agreeToTheTerms")}
            </label>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 mt-10">
          <button
            onClick={() => navigate(-1)}
            type="button"
            className="px-6 py-3.5 text-sm bg-transparent border text-[#333] rounded-md hover:bg-gray-100"
          >
            {t("Cancel")}
          </button>
          <button
            onClick={handleCheckout}
            type="button"
            disabled={!agree}
            className="px-6 py-3.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {t("payment")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
