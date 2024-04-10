import ModalEditTf from "../../components/common/Modal/ModalEditTf";
import ActionCell from "./component/ActionCell";

const column = [
  {
    name: "ID",
    selector: (row) => row.TimeFrameID,
    sortable: true,
  },
  {
    name: "Thời gian bắt đầu",
    selector: (row) => row.StartTime,
    sortable: true,
  },
  {
    name: "Thời gian kết thúc (dự kiến)",
    selector: (row) => row.EndTime,
  },
  {
    name: "Action",
    cell: (row) => {
      return (
        <>
          <ActionCell row={row} Children={ModalEditTf} />
        </>
      );
    },
  },
];

export default column;
