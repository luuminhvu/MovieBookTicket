import React, { useState } from "react";
import ChartDoughnut from "../../../components/Chart/ChartDoughnut";
import ChartMulti from "../../../components/Chart/ChartMulti";
import ChartPolarArea from "../../../components/Chart/ChartPolarArea";
import ChartVertical from "../../../components/Chart/ChartVertical";

const Dashboard = () => {
  const [selectedChart, setSelectedChart] = useState("multi"); // Giá trị mặc định là "multi"

  const handleChartChange = (event) => {
    setSelectedChart(event.target.value);
  };

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <h1 className="rainbow text-center text-3xl text-blue-500">
        Chào mừng bạn đến với trang quản trị
      </h1>
      <h2 className="rainbow text-center text-lg text-gray-500">
        Hãy kiểm tra doanh thu và số vé bán ra gần đây nhất
      </h2>

      <div className="mt-4 border border-red-500">
        <div className="flex justify-center items-center mt-4">
          <label htmlFor="chartSelect" className="mr-2">
            Chọn loại thống kê:
          </label>
          <select
            id="chartSelect"
            className="border border-gray-400 rounded py-1 px-2"
            value={selectedChart}
            onChange={handleChartChange}
          >
            <option value="multi">Biểu đồ đa dạng</option>
            <option value="vertical">Biểu đồ dọc</option>
            <option value="doughnut">Biểu đồ Doughnut</option>
            <option value="polar">Biểu đồ Polar Area</option>
          </select>
        </div>
        <div className="mt-4">
          {selectedChart === "multi" && <ChartMulti />}
          {selectedChart === "vertical" && <ChartVertical />}
          {selectedChart === "doughnut" && <ChartDoughnut />}
          {selectedChart === "polar" && <ChartPolarArea />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
