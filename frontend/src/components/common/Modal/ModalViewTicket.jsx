import TicketIcon from "../../icons/Ticket";
import dayjs from "dayjs";
export function ModalViewTicket({ row, setOpenModal }) {
  return (
    <div>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div
          className="fixed inset-0 w-full h-full bg-black opacity-40"
          onClick={() => setOpenModal(false)}
        ></div>
        <div className="flex items-center px-4 py-8">
          <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
            <div className="mt-3">
              <div className="flex items-center justify-center flex-none w-12 h-12 mx-auto bg-green-500 rounded-full">
                <TicketIcon />
              </div>
              <div className="mt-2 text-center sm:ml-4 sm:text-left">
                <h4 className="text-lg text-center font-medium text-gray-800">
                  Chi tiết vé đặt
                </h4>
                <div className="mt-3 border border-gray-300 rounded-lg flex">
                  <div className="p-4 w-2/3">
                    <p className="text-gray-600">
                      <span className="font-semibold">Mã vé:</span>{" "}
                      {row.NumberOfTickets}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Tên phim:</span>{" "}
                      {row.MovieName}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Ngày đặt:</span>{" "}
                      {dayjs(row.BookingDate).format("DD/MM/YYYY HH:mm:ss")}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Ngày chiếu:</span>{" "}
                      {dayjs(row.Date).format("DD/MM/YYYY")}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Suất chiếu:</span>{" "}
                      {row.StartTime.slice(0, 5)}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Rạp:</span>{" "}
                      {row.CinemaName}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Phòng chiếu:</span>{" "}
                      {row.CinemaHallName}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Ghế:</span>{" "}
                      {row.SeatNames}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Thời lượng:</span>{" "}
                      {row.Duration} phút
                    </p>
                  </div>
                  <div className="w-1/3 p-3">
                    <img
                      className="w-full h-full rounded-lg"
                      src={row.Poster}
                      alt={row.MovieName}
                    />
                  </div>
                </div>

                <div className="mt-4 border border-gray-300 rounded-lg">
                  <div className="p-4">
                    <h4 className="text-lg font-medium text-gray-800">
                      Thông tin người đặt
                    </h4>
                    <p className="text-gray-600">
                      <span className="font-semibold">Tên người đặt:</span>{" "}
                      {row.Username}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Email:</span> {row.Email}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Số điện thoại:</span>{" "}
                      {row.Phone ? "0" + row.Phone : "Chưa cập nhật"}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Mã đặt vé:</span>{" "}
                      {row.BookingID}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-center mt-4">
                  <button className="p-2.5 text-white bg-red-600 rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2">
                    In vé
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
