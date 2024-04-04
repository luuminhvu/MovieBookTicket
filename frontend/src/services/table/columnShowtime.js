import dayjs from "dayjs";
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
    cell: (row) => (
      <div className="flex justify-center">
        <button
          className="bg-blue-500 mr-2 p-2 text-white rounded-md hover:bg-blue-700
        "
        >
          Edit
        </button>
        <button className="bg-red-500 p-2 text-white rounded-md hover:bg-red-700">
          Delete
        </button>
      </div>
    ),
  },
];
export default column;
