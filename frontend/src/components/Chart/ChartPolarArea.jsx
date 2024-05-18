import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { PolarArea } from "react-chartjs-2";
import { getTopTimeFramesByRevenue } from "../../services/function";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);
const ChartPolarArea = () => {
  const [startTime, setStartTime] = useState([]);
  const [totalBooking, setTotalBooking] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getTopTimeFramesByRevenue();
        setTotalBooking(res.map((item) => item.TotalBookings));
        setStartTime(res.map((item) => item.StartTime));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const data = {
    labels: startTime,
    datasets: [
      {
        label: "# of Votes",
        data: totalBooking,
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
      <div className="m-auto w-[350px] h-[400px]">
        <div className="text-center text-lg ">
          Top khung giờ có doanh thu cao nhất
        </div>
        <PolarArea data={data} />
      </div>
    </>
  );
};
export default ChartPolarArea;
