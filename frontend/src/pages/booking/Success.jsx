import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../../utils/api";
import SuccessCpn from "../../components/common/Success";
import FailedCpn from "../../components/common/Failed";
import { useDispatch } from "react-redux";
import { setLoading } from "../../stores/loadingSlice";
const PaymentSuccess = () => {
  const query = useLocation().search;
  const [code, setCode] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading(true));
      try {
        const res = await api.get(`/payment/return${query}`);
        setCode(res.data.data.code);
        dispatch(setLoading(false));
      } catch (error) {
        dispatch(setLoading(false));
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return <>{code === "00" ? <SuccessCpn /> : <FailedCpn />}</>;
};

export default PaymentSuccess;
