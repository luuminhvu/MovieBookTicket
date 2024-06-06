import React, { useState, useEffect } from "react";
import { getAllUserVoucher } from "../../../services/function";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../stores/loadingSlice";
import column from "../../../services/table/columnUserVoucher";
import DataTable from "react-data-table-component";
import ModalAddUserVoucher from "../../../components/common/Modal/ModalAddUserVoucher";

const UserVoucher = () => {
  const [userData, setUserData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading(true));
      try {
        const data = await getAllUserVoucher();
        setUserData(data);
        dispatch(setLoading(false));
      } catch (error) {
        dispatch(setLoading(false));
        console.log(error);
      }
    };
    fetchData();
  }, [dispatch]);
  return (
    <>
      <>
        <div className="container mx-auto px-4 sm:px-8">
          <h1 className="text-center text-2xl text-pink-500">
            Quản lí voucher người dùng trong hệ thống
          </h1>
          <div className="mt-4">
            <div className="flex justify-start">
              <button
                onClick={() => setShowModal(true)}
                className="bg-green-500 p-2 text-white rounded-md hover:bg-blue-700 mb-4
            "
              >
                Thêm mới voucher cho người dùng
              </button>
            </div>
            <DataTable
              title="Danh sách voucher"
              columns={column}
              data={userData}
              pagination
              paginationPerPage={8}
              highlightOnHover
              pointerOnHover
            />
          </div>
        </div>
        {showModal && <ModalAddUserVoucher setOpenModal={setShowModal} />}
      </>
    </>
  );
};

export default UserVoucher;
