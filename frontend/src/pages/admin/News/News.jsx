import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";
import column from "../../../services/table/columnNews";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../stores/loadingSlice";
import { getNews } from "../../../stores/newsSlice";
import { useNavigate } from "react-router-dom";
const News = () => {
  const news = useSelector((state) => state.news.news);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchNews = async () => {
      dispatch(setLoading(true));
      try {
        await dispatch(getNews());
        dispatch(setLoading(false));
      } catch (error) {
        dispatch(setLoading(false));
        console.log(error);
      }
    };
    fetchNews();
  }, [dispatch]);
  return (
    <div className="container mx-auto px-4 sm:px-8">
      <h1 className="text-center text-xl text-yellow-500">
        Quản lí Page Tin tức
      </h1>
      <div className="mt-4">
        <div className="flex justify-start">
          <button
            onClick={() => navigate(`/admin/news/add`)} // Sử dụng arrow function hoặc callback function
            className="bg-green-500 p-2 text-white rounded-md hover:bg-blue-700"
          >
            Thêm Tin mới
          </button>
        </div>

        <DataTable
          title="Danh sách suất chiếu"
          columns={column}
          data={news}
          pagination
          highlightOnHover
          pointerOnHover
        />
      </div>
    </div>
  );
};

export default News;
