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
import * as XLSX from "xlsx";

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
    setMonth(Number(e.target.value));
  };

  const handleChangeYear = (e) => {
    setYear(Number(e.target.value));
  };

  const dispatch = useDispatch();
  const [day, setDay] = useState([]);
  const [numberOfTickets, setNumberOfTickets] = useState([]);
  const [revenue, setRevenue] = useState([]);
  const totalRevenue = revenue.reduce((acc, cur) => parseFloat(cur) + acc, 0);

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
        const result = await getRevenueByDayOfMonth(year, month);
        setDay(result.map((item) => item.Day));
        setRevenue(result.map((item) => item.Revenue));
        setNumberOfTickets(result.map((item) => item.NumberOfTickets));
        dispatch(setLoading(false));
      } catch (error) {
        dispatch(setLoading(false));
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, [year, month, dispatch]);

  const exportToExcel = () => {
    const worksheetData = day.map((day, index) => ({
      Day: day,
      Revenue: revenue[index],
      NumberOfTickets: numberOfTickets[index],
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData, { origin: "A6" });
    XLSX.utils.sheet_add_aoa(
      worksheet,
      [
        [
          {
            v: `Báo cáo doanh thu tháng ${month} năm ${year}`,
            s: { font: { bold: true } },
          },
        ],
        [
          {
            v: `Ngày xuất báo cáo: ${new Date().toLocaleDateString()}`,
            s: { font: { bold: true } },
          },
        ],
        [],
        ["Ngày", "Doanh thu", "Số vé"],
      ],
      { origin: "A1" }
    );

    XLSX.utils.sheet_add_aoa(
      worksheet,
      [[], ["Tổng doanh thu", "", totalRevenue]],
      { origin: `A${worksheetData.length + 6}` }
    );
    const columnWidths = [{ wch: 10 }, { wch: 20 }, { wch: 15 }];
    worksheet["!cols"] = columnWidths;
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Revenue Report");
    XLSX.writeFile(workbook, `Revenue_Report_${year}_${month}.xlsx`);
  };

  return (
    <div className="m-auto w-3/4">
      <div className="container">
        <div className="flex justify-between items-center gap-4 w-full">
          <div className="flex items-center gap-4">
            <button
              onClick={exportToExcel}
              className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            >
              Xuất Excel
            </button>
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
          <div className="flex items-center">
            <div className="flex flex-col items-end">
              <div className="text-lg">Tổng doanh thu: {totalRevenue} VNĐ</div>
              <div className="text-lg">
                Tổng số vé bán ra:{" "}
                {numberOfTickets.reduce((acc, cur) => cur + acc, 0)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Line data={data} options={options} />
    </div>
  );
};

export default ChartMulti;
