import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";
import column from "../../../services/table/columnMovie";
import ModalCreateMv from "../../../components/common/Modal/ModalCreateMv";
const Movie = () => {
  const movie = useSelector((state) => state.movie.movies);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    document.title = "Admin | Quản lí phim";
  }, []);

  return (
    <>
      <div className="container mx-auto px-4 sm:px-8">
        <h1 className="text-center text-xl text-yellow-500">
          Quản lí phim trong hệ thống
        </h1>
        <div className="mt-4">
          <div className="flex justify-start">
            <button
              onClick={() => setShowModal(true)}
              className="bg-green-500 p-2 text-white rounded-md hover:bg-blue-700
            "
            >
              Thêm mới phim
            </button>
          </div>

          <DataTable
            title="Danh sách phim"
            columns={column}
            data={movie}
            pagination
            paginationPerPage={4}
            highlightOnHover
            pointerOnHover
            dense
          />
        </div>
      </div>
      {showModal && <ModalCreateMv setOpenModal={setShowModal} />}
    </>
  );
};

export default Movie;
