const column = [
  {
    name: "ID",
    selector: (row) => row.TimeFrameID,
    sortable: true,
  },
  {
    name: "Thời gian bắt đầu",
    selector: (row) => row.StartTime,
    sortable: true,
  },
  {
    name: "Thời gian kết thúc (dự kiến)",
    selector: (row) => row.EndTime,
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
