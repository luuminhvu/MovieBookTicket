import dayjs from "dayjs";
import ActionCellNews from "./component/ActionCellNews";
const column = [
  {
    name: "ID",
    selector: (row) => row.NewsID,
    sortable: true,
    width: "50px",
  },
  {
    name: "Ảnh",
    selector: (row) => {
      return (
        <img
          src={row.Image}
          alt="img"
          className="w-40 h-40 object-fit rounded"
        />
      );
    },
    width: "200px",
  },

  {
    name: "Ngày tạo",
    selector: (row) => dayjs(row.CreatedDate).format("DD/MM/YYYY"),
    width: "150px",
  },
  {
    name: "Tiêu đề",
    selector: (row) => row.Title,
    sortable: true,
    width: "350px",
  },
  {
    name: "Nội dung",
    selector: (row) => row.Content,
    width: "400px",
  },
  {
    name: "Action",
    cell: (row) => {
      return (
        <>
          <ActionCellNews row={row} />
        </>
      );
    },
    width: "100px",
  },
];

export default column;
