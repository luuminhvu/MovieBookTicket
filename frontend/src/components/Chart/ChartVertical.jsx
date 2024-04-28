import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { getTopMoviesByRevenue } from "../../services/function";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Top 3 bộ phim có doanh thu cao nhất",
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

const ChartVertical = () => {
  const [labels, setLabels] = useState([]);
  const [revenue, setRevenue] = useState([]);
  const [tickets, setTickets] = useState([]);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Doanh thu",
        data: revenue,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        yAxisID: "y",
      },
      {
        label: "Số vé bán ra",
        data: tickets,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        yAxisID: "y1",
      },
    ],
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTopMoviesByRevenue();
        setLabels(data.map((item) => item.Name));
        setRevenue(data.map((item) => item.Revenue));
        setTickets(data.map((item) => item.NumberOfTicketsSold));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="m-auto w-3/4">
        <Bar data={data} options={options} />
      </div>
    </>
  );
};
export default ChartVertical;
