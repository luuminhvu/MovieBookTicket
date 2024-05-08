import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../../utils/api";
import SuccessCpn from "../../components/common/Success";
import FailedCpn from "../../components/common/Failed";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../stores/loadingSlice";
const PaymentSuccess = () => {
  const query = useLocation().search;
  const userId = useSelector((state) => state.auth.userId);
  const [code, setCode] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading(true));
      try {
        const res = await api.post(`/payment/return${query}`, {
          userId: userId,
        });
        setCode(res.data.data.code);
        dispatch(setLoading(false));
      } catch (error) {
        dispatch(setLoading(false));
        console.log(error);
      }
    };
    fetchData();
  }, [query, userId, dispatch]);
  return <>{code === "00" ? <SuccessCpn /> : <FailedCpn />}</>;
};

export default PaymentSuccess;
