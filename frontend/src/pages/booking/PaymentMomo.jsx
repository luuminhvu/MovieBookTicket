import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../../utils/api";
import SuccessCpn from "../../components/common/Success";
import FailedCpn from "../../components/common/Failed";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../stores/loadingSlice";

const PaymentMomo = () => {
  const query = useLocation().search;
  const userId = useSelector((state) => state.auth.userId);
  const [code, setCode] = useState(null);
  const dispatch = useDispatch();
  const params = new URLSearchParams(query);
  const resultCode = params.get("resultCode");
  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading(true));
      if (resultCode === "0") {
        try {
          const res = await api.post(`/payment/return/momo${query}`, {
            userId: userId,
          });
          setCode(res.data.data.code);
        } catch (error) {
          setCode("error");
        } finally {
          dispatch(setLoading(false));
        }
      }
    };
    fetchData();
  }, [query, userId, dispatch, resultCode]);

  if (code === null) {
    return (
      <div className="relative flex m-auto justify-center items-center h-screen">
        <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500"></div>
        <img
          src="https://www.svgrepo.com/show/509001/avatar-thinking-9.svg"
          className="rounded-full h-28 w-28"
          alt="Loading"
        />
      </div>
    );
  } else {
    return <>{code === "0" ? <SuccessCpn /> : <FailedCpn />}</>;
  }
};

export default PaymentMomo;
