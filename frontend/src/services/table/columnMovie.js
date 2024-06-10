import ModalEditMv from "../../components/common/Modal/ModalEditMv";
import ActionCell from "./component/ActionCell";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

// Extend dayjs with plugins
dayjs.extend(utc);
dayjs.extend(timezone);

const column = [
  {
    name: "ID",
    selector: (row) => row.MovieID,
    sortable: true,
    width: "50px",
  },
  {
    name: "Poster",
    selector: (row) => {
      return (
        <img
          src={row.Poster}
          alt={row.Name}
          style={{ width: "100px", height: "100px" }}
        />
      );
    },
    sortable: true,
    width: "100px",
  },
  {
    name: "Tên phim",
    selector: (row) => row.Name,
    sortable: true,
    width: "100px",
  },
  {
    name: "Thể loại",
    selector: (row) => row.Genres,
    width: "150px",
  },
  {
    name: "Đạo diễn",
    selector: (row) => row.Directors,
    width: "150px",
  },
  {
    name: "Diễn viên",
    selector: (row) => row.Actors,
    width: "150px",
  },
  {
    name: "Thời lượng",
    selector: (row) => row.Duration,
    width: "100px",
  },
  {
    name: "Ngày công chiếu",
    selector: (row) =>
      dayjs(row.ReleaseDate).tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY"),
    width: "120px",
  },
  {
    name: "Thời lượng",
    selector: (row) => row.Duration,
    width: "70px",
  },
  {
    name: "Ngôn ngữ",
    selector: (row) => row.Language,
    width: "100px",
  },
  {
    name: "Quốc gia",
    selector: (row) => row.Country,
    width: "70px",
  },
  {
    name: "Action",
    cell: (row) => {
      return (
        <>
          <ActionCell row={row} Children={ModalEditMv} />
        </>
      );
    },
  },
];

export default column;
