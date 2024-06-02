import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setLoading } from "../../stores/loadingSlice";
import { fetchUserVouchers } from "../../stores/voucherSlice";
import dayjs from "dayjs";
const DiscountCodes = () => {
  const dispatch = useDispatch();
  const userVoucher = useSelector((state) => state.voucher.userVoucher);
  const UserID = useSelector((state) => state.auth.userId);
  useEffect(() => {
    document.title = "Mã giảm giá đặc biệt";
    const fetchData = async () => {
      try {
        dispatch(setLoading(true));
        await dispatch(fetchUserVouchers(UserID));
        dispatch(setLoading(false));
      } catch (error) {
        dispatch(setLoading(false));
        throw error;
      }
    };
    fetchData();
  }, [dispatch, UserID]);
  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div className="container mx-auto p-4">
      <header className="text-center mb-8 border-b border-gray-300 pb-4">
        <h1 className="text-3xl font-bold text-indigo-600">
          Mã giảm giá đặc biệt
        </h1>
        <p className="mt-2 text-lg text-gray-700">
          Hãy sử dụng mã giảm giá để nhận ưu đãi hấp dẫn!
        </p>
      </header>
      {userVoucher.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {userVoucher.map((discount, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-indigo-500 to-violet-500 text-white p-8 rounded-lg shadow-lg"
            >
              <div className="text-3xl font-bold mb-4">
                Mã giảm giá đặc biệt
              </div>
              <div className="text-lg mb-4">{discount.Description}</div>
              <div className="text-base mb-4">Mã Voucher:</div>
              <div className="bg-white text-gray-800 rounded-lg px-4 py-2 flex items-center justify-between">
                <span className="text-2xl font-semibold">
                  {discount.VoucherCode}
                </span>
                <button
                  className="bg-blue-800 text-white px-3 py-1 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={() => handleCopy(discount.VoucherCode)}
                >
                  Copy
                </button>
              </div>
              <div className="text-sm mt-4">
                <p>
                  Hạn sử dụng:{" "}
                  <span className="font-semibold">
                    {dayjs(discount.ExpiryDate).format("DD/MM/YYYY")}
                  </span>
                </p>
                <p className="mt-4">Điều khoản và điều kiện áp dụng</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-2xl h-96 text-gray-600 mt-8">
          <p>Hiện tại bạn không có mã giảm giá nào.</p>
          <p className="mt-4">
            Hãy tham gia các chương trình khuyến mãi để nhận mã giảm giá nhé!
          </p>
        </div>
      )}
    </div>
  );
};

export default DiscountCodes;
