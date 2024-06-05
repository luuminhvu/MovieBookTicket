import dayjs from "dayjs";
import ActionCell from "./component/ActionCell";
import ModalEditVoucher from "../../components/common/Modal/ModalEditVoucher";

const column = [
  {
    name: "ID",
    selector: (row) => row.VoucherID,
    sortable: true,
    width: "100px",
  },
  {
    name: "Code",
    selector: (row) => row.VoucherCode,
    sortable: true,
  },
  {
    name: "Mức giảm giá",
    selector: (row) => {
      return <>{row.Discount}%</>;
    },
  },
  {
    name: "Ngày hết hạn",
    selector: (row) => {
      return <>{dayjs(row.ExpiryDate).format("DD/MM/YYYY")}</>;
    },
    sortable: true,
  },
  {
    name: "Mô tả",
    selector: (row) => row.Description,
    width: "250px",
  },
  {
    name: "Trạng thái",
    selector: (row) => {
      return <>{row.Active === 1 ? "Active" : "Inactive"}</>;
    },
  },
  {
    name: "Action",
    cell: (row) => {
      return (
        <>
          <ActionCell row={row} Children={ModalEditVoucher} />
        </>
      );
    },
  },
];

export default column;
