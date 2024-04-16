import ModalEditCinemaHall from "../../components/common/Modal/ModalEditCinemaHall";
import ActionCell from "./component/ActionCell";

const column = [
  {
    name: "ID",
    selector: (row) => row.CinemaHallID,
    sortable: true,
  },
  {
    name: "Tên rạp",
    selector: (row) => row.CinemaName,
    sortable: true,
  },
  {
    name: "Tên phòng chiếu",
    selector: (row) => row.Name,
  },
  {
    name: "Số ghế",
    selector: (row) => row.Capacity,
  },
  {
    name: "Action",
    cell: (row) => {
      return (
        <>
          <ActionCell row={row} Children={ModalEditCinemaHall} />
        </>
      );
    },
  },
];

export default column;
