import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../stores/loadingSlice";
import { fetchShow } from "../../../stores/showSlice";
import DataTable from "react-data-table-component";
import column from "../../../services/table";
const ShowTime = () => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.showTime.show);
  useEffect(() => {
    document.title = "Quản lí suất chiếu";
    const fetchData = async () => {
      dispatch(setLoading(true));
      try {
        await dispatch(fetchShow());
        dispatch(setLoading(false));
      } catch (error) {
        dispatch(setLoading(false));
      }
    };
    fetchData();
  }, [dispatch]);
  return (
    <>
      <div className="container mx-auto px-4 sm:px-8">
        <h1 className="text-center text-xl text-yellow-500">
          Quản lí suất chiếu trong hệ thống
        </h1>
        <div className="mt-4">
          <DataTable
            title="Danh sách suất chiếu"
            columns={column}
            data={show}
            pagination
            highlightOnHover
            pointerOnHover
          />
        </div>
      </div>
    </>
  );
};

export default ShowTime;
