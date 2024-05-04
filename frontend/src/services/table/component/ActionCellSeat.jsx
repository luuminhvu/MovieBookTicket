import { useState } from "react";
import Eye from "../../../components/icons/Eye";
import ModalAddSeat from "../../../components/common/Modal/ModalAddSeat";
const ActionCellSeat = ({ row, Children }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenAdd, setModalOpenAdd] = useState(false);
  const handleEditClick = (row) => {
    setModalOpen(true);
  };
  const handleAddClick = (row) => {
    setModalOpenAdd(true);
  };
  return (
    <div className="flex justify-center">
      <button
        onClick={() => handleEditClick(row)}
        className="bg-blue-500 mr-2 p-2 text-white rounded-md hover:bg-blue-700"
      >
        <Eye />
      </button>
      <button
        onClick={() => handleAddClick(row)}
        className="bg-red-500 p-2 text-white rounded-md hover:bg-red-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-plus"
          viewBox="0 0 16 16"
        >
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
        </svg>
      </button>

      {modalOpen && <Children row={row} setOpenModal={setModalOpen} />}
      {modalOpenAdd && (
        <ModalAddSeat row={row} setOpenModalAdd={setModalOpenAdd} />
      )}
    </div>
  );
};
export default ActionCellSeat;
