import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { getRevenueByDayOfMonth } from "../../services/function";
import { useDispatch } from "react-redux";
import { setLoading } from "../../stores/loadingSlice";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  interaction: {
    mode: "index",
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: "Biểu đồ doanh thu và số vé bán ra theo ngày",
    },
  },
  scales: {
    y: {
      type: "linear",
      display: true,
      position: "left",
    },
    y1: {
      type: "linear",
      display: true,
      position: "right",
      grid: {
        drawOnChartArea: false,
      },
    },
  },
};
const ChartMulti = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);
  const handleChangeMonth = (e) => {
    setMonth(e.target.value);
  };
  const handleChangeYear = (e) => {
    setYear(e.target.value);
  };
  const dispatch = useDispatch();
  const [day, setDay] = useState([]);
  const [numberOfTickets, setNumberOfTickets] = useState([]);
  const [revenue, setRevenue] = useState([]);
  const data = {
    labels: day,
    datasets: [
      {
        label: "Doanh thu",
        data: revenue,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        yAxisID: "y",
      },
      {
        label: "Số vé",
        data: numberOfTickets,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        yAxisID: "y1",
      },
    ],
  };
  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading(true));
      try {
        const data = await getRevenueByDayOfMonth(year, month);
        setDay(data.map((item) => item.Day));
        setRevenue(data.map((item) => item.Revenue));
        setNumberOfTickets(data.map((item) => item.NumberOfTickets));
        dispatch(setLoading(false));
      } catch {
        dispatch(setLoading(false));
        console.log("error");
      }
    };
    fetchData();
  }, [year, month, dispatch]);

  return (
    <div className="m-auto w-3/4">
      <div className="flex gap-4">
        <div className="flex items-center">
          <label className="text-lg mr-2">Chọn năm:</label>
          <select
            className="bg-gray-200 p-2 rounded-md"
            defaultValue={currentYear}
            onChange={handleChangeYear}
          >
            <option value={currentYear - 1}>{currentYear - 1}</option>
            <option value={currentYear}>{currentYear}</option>
          </select>
        </div>
        <div className="flex items-center">
          <label className="text-lg mr-2">Chọn tháng:</label>
          <select
            className="bg-gray-200 p-2 rounded-md"
            defaultValue={currentMonth}
            onChange={handleChangeMonth}
          >
            {Array.from({ length: 12 }, (_, index) => {
              const monthNumber = index + 1;
              return (
                <option key={monthNumber} value={monthNumber}>
                  Tháng {monthNumber}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      <Line data={data} options={options} />
    </div>
  );
};

export default ChartMulti;
