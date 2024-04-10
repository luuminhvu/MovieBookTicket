import { useState } from "react";

const ActionCell = ({ row, Children }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleEditClick = (row) => {
    setModalOpen(true);
  };

  return (
    <div className="flex justify-center">
      <button
        onClick={() => handleEditClick(row)}
        className="bg-blue-500 mr-2 p-2 text-white rounded-md hover:bg-blue-700"
      >
        Edit
      </button>
      <button className="bg-red-500 p-2 text-white rounded-md hover:bg-red-700">
        Delete
      </button>
      {modalOpen && <Children row={row} setOpenModal={setModalOpen} />}
    </div>
  );
};
export default ActionCell;
