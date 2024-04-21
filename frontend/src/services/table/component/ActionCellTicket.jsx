import { useState } from "react";
import Eye from "../../../components/icons/Eye";

const ActionCellTicket = ({ row, Children }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenAdd, setModalOpenAdd] = useState(false);

  const handleEditClick = (row) => {
    setModalOpen(true);
  };

  return (
    <div className="flex justify-center">
      <button
        onClick={() => handleEditClick(row)}
        className="bg-blue-500 mr-2 p-2 text-white rounded-md hover:bg-blue-700"
      >
        <Eye />
      </button>

      {modalOpen && <Children row={row} setOpenModal={setModalOpen} />}
    </div>
  );
};
export default ActionCellTicket;
