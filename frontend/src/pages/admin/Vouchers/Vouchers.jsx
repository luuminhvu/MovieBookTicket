import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../stores/loadingSlice";
import { fetchVouchers } from "../../../stores/voucherSlice";
import column from "../../../services/table/columnVoucher";
import DataTable from "react-data-table-component";
import ModalAddVoucher from "../../../components/common/Modal/ModalAddVoucher";

const Vouchers = () => {
  const vouchers = useSelector((state) => state.voucher.vouchers);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading(true));
      try {
        await dispatch(fetchVouchers());
        dispatch(setLoading(false));
      } catch (error) {
        dispatch(setLoading(false));
        console.error(error);
      }
    };
    fetchData();
  }, [dispatch]);

  return (
    <>
      <div className="container mx-auto px-4 sm:px-8">
        <h1 className="text-center text-2xl text-pink-500">
          Quản lí voucher trong hệ thống
        </h1>
        <div className="mt-4">
          <div className="flex justify-start">
            <button
              onClick={() => setShowModal(true)}
              className="bg-green-500 p-2 text-white rounded-md hover:bg-blue-700 mb-4
            "
            >
              Thêm mới voucher
            </button>
          </div>
          <DataTable
            title="Danh sách voucher"
            columns={column}
            data={vouchers}
            pagination
            paginationPerPage={8}
            highlightOnHover
            pointerOnHover
          />
        </div>
      </div>
      {showModal && <ModalAddVoucher setOpenModal={setShowModal} />}
    </>
  );
};

export default Vouchers;
