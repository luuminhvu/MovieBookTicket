import ModalEditCinema from "../../components/common/Modal/ModalEditCinema";
import ActionCell from "./component/ActionCell";

const column = [
  {
    name: "ID",
    selector: (row) => row.CinemaID,
    sortable: true,
  },
  {
    name: "Tên rạp",
    selector: (row) => row.Name,
    sortable: true,
  },
  {
    name: "Địa điểm",
    selector: (row) => row.Location,
  },
  {
    name: "Action",
    cell: (row) => {
      return (
        <>
          <ActionCell row={row} Children={ModalEditCinema} />
        </>
      );
    },
  },
];

export default column;
