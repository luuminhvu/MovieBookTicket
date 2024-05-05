import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoading } from "../../stores/loadingSlice";
import { activateAccount } from "../../services/function";

const Active = () => {
  const dispatch = useDispatch();
  const token = window.location.href.split("=")[1];
  const [status, setStatus] = useState(false);

  useEffect(() => {
    document.title = "Kích hoạt tài khoản";

    const fetchActivationStatus = async () => {
      dispatch(setLoading(true));
      try {
        const res = await activateAccount(token);
        res && setStatus(true);
        dispatch(setLoading(false));
      } catch (error) {
        console.error(error);
      }
    };

    fetchActivationStatus();
  }, [dispatch, token]);

  return (
    <div class="bg-gray-100 h-full">
      <div class="bg-white p-6 md:mx-auto">
        <svg viewBox="0 0 24 24" class="text-green-600 w-16 h-16 mx-auto my-6">
          <path
            fill="currentColor"
            d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
          ></path>
        </svg>
        <div class="text-center">
          <h3 class="md:text-2xl text-base text-gray-900 font-semibold text-center">
            {status
              ? "Chúc mừng bạn đã kích hoạt tài khoản thành công"
              : "Kích hoạt tài khoản thất bại"}
          </h3>
          <p class="text-gray-600 my-2">
            {status
              ? "Tài khoản của bạn đã được kích hoạt thành công, bạn có thể đăng nhập và sử dụng dịch vụ của chúng tôi"
              : "Kích hoạt tài khoản thất bại, vui lòng thử lại sau"}
          </p>
          <p> Chúc bạn một ngày tốt lành </p>
          <div class="py-10 text-center">
            <Link
              to="/"
              class="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
            >
              Trở về trang chủ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Active;
