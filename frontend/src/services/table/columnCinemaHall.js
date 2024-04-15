import ActionCell from "./component/ActionCell";

const column = [
  {
    name: "ID",
    selector: (row) => row.CinemaHallID,
    sortable: true,
  },
  {
    name: "Tên rạp",
    selector: (row) => row.CinemaName,
    sortable: true,
  },
  {
    name: "Tên phòng chiếu",
    selector: (row) => row.Name,
  },
  {
    name: "Số ghế",
    selector: (row) => row.Capacity,
  },
  {
    name: "Action",
    cell: (row) => {
      return (
        <>
          <ActionCell row={row} />
        </>
      );
    },
  },
];

export default column;
