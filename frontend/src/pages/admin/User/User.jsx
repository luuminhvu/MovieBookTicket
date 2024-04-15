import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../stores/loadingSlice";
import { getUser } from "../../../services/function";
import column from "../../../services/table/columnUser";
const User = () => {
  // const [showModal, setShowModal] = useState(false);
  // const [showModalEdit, setShowModalEdit] = useState(false);
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  console.log(filteredData);
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Quản lí thành viên";
    const fetchData = async () => {
      dispatch(setLoading(true));
      try {
        const res = await getUser();
        setOriginalData(res);
        setFilteredData(res);
        dispatch(setLoading(false));
      } catch (error) {
        dispatch(setLoading(false));
      }
    };
    fetchData();
  }, [dispatch]);

  const handleFilter = (filter) => {
    const newData = originalData.filter((row) => {
      return row.Email.toLowerCase().includes(filter.toLowerCase());
    });
    setFilteredData(newData);
  };

  return (
    <>
      <div className="container mx-auto px-4 sm:px-8">
        <h1 className="text-center text-xl text-yellow-500">
          Quản lí thành viên trong hệ thống
        </h1>
        <div className="mt-4">
          {/* <div className="flex justify-start">
            <button
              onClick={() => setShowModal(true)}
              className="bg-green-500 p-2 text-white rounded-md hover:bg-blue-700
            "
            >
              Thêm mới thành viên
            </button>
          </div> */}
          <div class="flex justify-end">
            <input
              onChange={(e) => handleFilter(e.target.value)}
              type="text"
              placeholder="Tìm kiếm theo Email"
              className="p-2 border border-gray-600 rounded-md"
            />
          </div>

          <DataTable
            title="Danh sách thành viên"
            columns={column}
            data={filteredData}
            pagination
            paginationPerPage={3}
            highlightOnHover
            pointerOnHover
          />
        </div>
      </div>
    </>
  );
};

export default User;
