import ModalViewVoucher from "../../components/common/Modal/ModalViewVoucher";
import ActionCellTicket from "./component/ActionCellTicket";

const column = [
  {
    name: "ID User",
    selector: (row) => row.UserID,
    sortable: true,
  },
  {
    name: "Email",
    selector: (row) => row.Email,
  },
  {
    name: "Action",
    cell: (row) => {
      return (
        <>
          <ActionCellTicket row={row} Children={ModalViewVoucher} />
        </>
      );
    },
  },
];

export default column;
