import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { getTopGenresByRevenue } from "../../services/function";
import { setLoading } from "../../stores/loadingSlice";
import { useDispatch } from "react-redux";

ChartJS.register(ArcElement, Tooltip, Legend);
const ChartDoughnut = () => {
  const dispatch = useDispatch();
  const [genres, setGenres] = useState([]);
  const [tickets, setTickets] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading(true));
      try {
        const res = await getTopGenresByRevenue();
        setGenres(res.map((item) => item.Genres));
        setTickets(res.map((item) => item.TotalTicketsSold));
        console.log(res);
        dispatch(setLoading(false));
      } catch (error) {
        dispatch(setLoading(false));
        console.log(error);
      }
    };
    fetchData();
  }, [dispatch]);

  const data = {
    labels: genres,
    datasets: [
      {
        label: "Số vé bán ra",
        data: tickets,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="m-auto w-3/4">
      <div className="text-center text-lg ">
        Top thể loại phim bán chạy nhất
      </div>

      <Doughnut data={data} />
    </div>
  );
};

export default ChartDoughnut;
