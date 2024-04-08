import DataTable from "react-data-table-component";
import column from "../../../services/table/columnTimeFrame";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../stores/loadingSlice";
import { fetchTimeframes } from "../../../stores/timeFrameSlice";
import ModalCreateTf from "../../../components/common/Modal/ModalCreateTf";
import ModalEditTf from "../../../components/common/Modal/ModalEditTf";
const TimeFrame = () => {
  const timeFrame = useSelector((state) => state.timeFrame.timeframes);
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    document.title = "Quản lí khung giờ chiếu";
    const fetchData = async () => {
      dispatch(setLoading(true));
      try {
        await dispatch(fetchTimeframes());
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
          Quản lí khung giờ chiếu trong hệ thống
        </h1>
        <div className="mt-4">
          <div className="flex justify-start">
            <button
              onClick={() => setShowModal(true)}
              className="bg-green-500 p-2 text-white rounded-md hover:bg-blue-700
            "
            >
              Thêm mới khung giờ chiếu
            </button>
          </div>
          <DataTable
            title="Danh sách khung giờ chiếu"
            columns={column}
            data={timeFrame}
            pagination
            paginationPerPage={3}
            highlightOnHover
            pointerOnHover
          />
        </div>
      </div>
      {showModal && <ModalCreateTf setOpenModal={setShowModal} />}
      {showModalEdit && <ModalEditTf setOpenModal={setShowModalEdit} />}
    </>
  );
};

export default TimeFrame;
