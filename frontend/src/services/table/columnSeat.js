import ModalWatchSeat from "../../components/common/Modal/ModalWatchSeat";

import ActionCellSeat from "./component/ActionCellSeat";

const column = [
  {
    name: "ID",
    selector: (row) => row.CinemaHallID,
    sortable: true,
  },
  {
    name: "Tên phòng chiếu",
    selector: (row) => row.CinemaHallName,
    sortable: true,
  },
  {
    name: "Tên rạp",
    selector: (row) => row.CinemaName,
  },
  {
    name: "Số ghế",
    selector: (row) => <>{row.Seats.length === 1 ? "0" : row.Seats.length}</>,
  },
  {
    name: "Action",
    cell: (row) => {
      return (
        <>
          <ActionCellSeat row={row} Children={ModalWatchSeat} />
        </>
      );
    },
  },
];

export default column;
