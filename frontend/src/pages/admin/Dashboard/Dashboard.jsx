import ChartDoughnut from "../../../components/Chart/ChartDoughnut";
import ChartMulti from "../../../components/Chart/ChartMulti";
import ChartPolarArea from "../../../components/Chart/ChartPolarArea";
import ChartVertical from "../../../components/Chart/ChartVertical";

const Dashboard = () => {
  return (
    <>
      <div className="container mx-auto px-4 sm:px-8">
        <h1 className="rainbow text-center text-3xl text-blue-500">
          Chào mừng bạn đến với trang quản trị
        </h1>
        <h2 className="rainbow text-center text-lg text-gray-500">
          Hãy kiểm tra doanh thu và số vé bán ra gần đây nhất
        </h2>

        <div className="mt-4 border border-red-500">
          <div className="mt-4">
            <ChartMulti />
          </div>
        </div>
        <div className="mt-10">
          <div className="mt-4 border border-red-500">
            <ChartVertical />
          </div>
        </div>
        <div className="mt-10">
          <div className="mt-4 border border-red-500">
            <ChartDoughnut />
          </div>
        </div>
        <div className="mt-10">
          <div className="mt-4 border border-red-500">
            <ChartPolarArea />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
