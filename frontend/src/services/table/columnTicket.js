import dayjs from "dayjs";
import ActionCellTicket from "./component/ActionCellTicket";
import { ModalViewTicket } from "../../components/common/Modal/ModalViewTicket";

const column = [
  {
    name: "Mã đặt vé",
    selector: (row) => row.NumberOfTickets,
    sortable: true,
  },
  {
    name: "Mã người đặt",
    selector: (row) => row.UserID,
    sortable: true,
  },
  {
    name: "Tên người dùng",
    selector: (row) => row?.Username,
  },
  {
    name: "Email",
    selector: (row) => row.Email,
  },
  {
    name: "Phim",
    selector: (row) => row.MovieName,
  },
  {
    name: "Suất chiếu",
    selector: (row) => {
      return (
        <>
          <p>
            {dayjs(row.Date).format("DD/MM/YYYY")} - {row.StartTime.slice(0, 5)}
          </p>
        </>
      );
    },
  },
  {
    name: "Action",
    cell: (row) => {
      return (
        <>
          <ActionCellTicket row={row} Children={ModalViewTicket} />
        </>
      );
    },
  },
];

export default column;
