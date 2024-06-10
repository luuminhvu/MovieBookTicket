import ModalEditUser from "../../components/common/Modal/ModalEditUser";
import ActionCell from "./component/ActionCell";
import dayjs from "dayjs";

import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);

const column = [
  // {
  //   name: "ID",
  //   selector: (row) => row.UserID,
  //   sortable: true,
  //   width: "100px",
  // },
  {
    name: "Avatar",
    selector: (row) => {
      return (
        <>
          {row.Avatar ? (
            <img
              className="object-cover"
              src={row.Avatar}
              alt={row.Username}
              style={{ width: "100px", height: "100px" }}
            />
          ) : (
            "Chưa cập nhật"
          )}
        </>
      );
    },
    sortable: true,
    width: "100px",
  },
  {
    name: "Tên người dùng",
    selector: (row) => row.Username,
    sortable: true,
    width: "150px",
  },
  {
    name: "Họ và tên",
    selector: (row) => <>{row.FullName ? row.FullName : "Chưa cập nhật"}</>,
    width: "120px",
  },
  {
    name: "Email",
    selector: (row) => row.Email,
    width: "170px",
  },
  {
    name: "Số điện thoại",
    selector: (row) => <>{row.Phone ? "0" + row.Phone : "Chưa cập nhật"}</>,

    width: "120px",
  },
  {
    name: "Địa chỉ",
    selector: (row) => <>{row.Address ? row.Address : "Chưa cập nhật"}</>,

    width: "120px",
  },
  {
    name: "Ngày sinh",
    selector: (row) => (
      <>
        {row.Birthday
          ? dayjs(row.Birthday).tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY")
          : "Chưa cập nhật"}
      </>
    ),
    width: "110px",
  },
  {
    name: "Ngày đăng kí",
    selector: (row) => (
      <>
        {row.DateRegister ? dayjs(row.DateRegister).format("DD/MM/YYYY") : ""}
      </>
    ),
    width: "110px",
  },
  {
    name: "Role",
    selector: (row) => row.Role,
    width: "90px",
  },
  {
    name: "Trạng thái",
    selector: (row) =>
      row.Active === 1 ? (
        <span className="text-green-500">Active</span>
      ) : (
        <span className="text-red-500">Inactive</span>
      ),

    width: "80px",
  },
  {
    name: "Action",
    cell: (row) => {
      return (
        <>
          <ActionCell row={row} Children={ModalEditUser} />
        </>
      );
    },
  },
];

export default column;
