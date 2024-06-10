import dayjs from "dayjs";
import ActionCellTicket from "./component/ActionCellTicket";
import { ModalViewTicket } from "../../components/common/Modal/ModalViewTicket";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const column = [
  {
    name: "Mã vé",
    selector: (row) => row.NumberOfTickets,
    sortable: true,
    width: "100px",
  },
  {
    name: "Mã đơn hàng",
    selector: (row) => row.BookingID,
    sortable: true,
    width: "100px",
  },
  {
    name: "Mã người đặt",
    selector: (row) => row.UserID,
    sortable: true,
  },
  {
    name: "Mã giao dịch",
    selector: (row) => row.TransactionNo,
    sortable: true,
  },
  {
    name: "Thời gian đặt",
    selector: (row) => {
      return (
        <>
          <p>
            {dayjs(row.BookingDate).tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY")}
          </p>
          <p>{dayjs(row.BookingDate).tz("Asia/Ho_Chi_Minh").format("HH:mm")}</p>
        </>
      );
    },
    sortable: true,
    width: "100px",
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
