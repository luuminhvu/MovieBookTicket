import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../../utils/api";
import SuccessCpn from "../../components/common/Success";
import FailedCpn from "../../components/common/Failed";
const PaymentSuccess = () => {
  const query = useLocation().search;
  const [code, setCode] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/payment/return${query}`);
        setCode(res.data.data.code);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return <>{code === "00" ? <SuccessCpn /> : <FailedCpn />}</>;
};

export default PaymentSuccess;
