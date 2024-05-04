import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../stores/loadingSlice";
import { getAllOrderForAdmin } from "../../../services/function";
import DataTable from "react-data-table-component";
import column from "../../../services/table/columnTicket";

const Order = () => {
  const [order, setOrder] = useState([]);
  console.log(order);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("orderCode");
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Quản lí vé | Admin";
    const fetchOrder = async () => {
      dispatch(setLoading(true));
      try {
        const res = await getAllOrderForAdmin();
        setOrder(res);
        dispatch(setLoading(false));
      } catch (error) {
        dispatch(setLoading(false));
        throw error;
      }
    };
    fetchOrder();
  }, [dispatch]);

  const filteredOrder = order?.filter((row) => {
    if (!searchTerm) {
      return true;
    }
    if (searchType === "orderCode") {
      return (
        row.NumberOfTickets &&
        row.NumberOfTickets.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else if (searchType === "email") {
      return (
        row.Email && row.Email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return true;
  });

  return (
    <>
      <div className="container mx-auto px-4 sm:px-8">
        <h1 className="text-center text-xl text-yellow-500">
          Quản lí vé xem phim khách hàng đã đặt
        </h1>
        <div className="mt-4">
          <div className="flex justify-between mb-4">
            <div className="flex items-center">
              <select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                className="p-2 border border-gray-600 rounded-md mr-2 h-10"
              >
                <option value="orderCode">Mã đặt vé</option>
                <option value="email">Email</option>
              </select>
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="p-2 border border-gray-600 rounded-md h-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <DataTable
            title="Danh sách vé xem phim khách hàng đã đặt"
            columns={column}
            data={filteredOrder}
            pagination
            paginationPerPage={8}
            highlightOnHover
            pointerOnHover
            dense
          />
        </div>
      </div>
    </>
  );
};

export default Order;
