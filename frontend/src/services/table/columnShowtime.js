import dayjs from "dayjs";
import ActionCell from "./component/ActionCell";
import ModalEditSt from "../../components/common/Modal/ModalEditSt";
const column = [
  {
    name: "ID",
    selector: (row) => row.ShowtimeID,
    sortable: true,
  },
  {
    name: "Phim",
    selector: (row) => row.MovieName,
  },
  {
    name: "Phòng chiếu",
    selector: (row) => row.CinemaName,
  },
  {
    name: "Phòng chiếu",
    selector: (row) => row.Name,
  },
  {
    name: "Suất chiếu",
    selector: (row) => row.StartTime,
    sortable: true,
  },
  {
    name: "Ngày chiếu",
    selector: (row) => dayjs(row.Date).format("DD/MM/YYYY"),
    sortable: true,
  },
  {
    name: "Action",
    cell: (row) => <ActionCell row={row} Children={ModalEditSt} />,
  },
];
export default column;
