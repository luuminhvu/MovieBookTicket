import TicketDetailIcon from "../../icons/TicketDetail";
import { deleteUserVoucher } from "../../../services/function";
export default function ModalViewVoucher({ setOpenModal, row }) {
  return (
    <>
      <div className="fixed inset-8 z-10 overflow-y-auto">
        <div
          className="fixed inset-0 w-full h-full bg-black opacity-40"
          onClick={() => setOpenModal(false)}
        ></div>
        <div className="flex items-center justify-center px-4 py-8">
          <div className="relative w-full max-w-2xl p-6 mx-auto bg-white rounded-lg shadow-lg">
            <div className="mt-3">
              <div className="flex items-center justify-center flex-none w-20 h-20 mx-auto bg-red-100 rounded-full">
                <TicketDetailIcon className="w-12 h-12 text-red-500" />
              </div>
              <div className="mt-4 text-center">
                <h4 className="text-xl font-semibold text-gray-800">
                  Danh sách voucher
                </h4>
                <p className="text-gray-600 text-sm">
                  Kiểm tra các mã giảm giá của {row.Email}
                </p>
              </div>
              <div className="mt-6">
                <table className="min-w-full border-collapse block md:table">
                  <thead className="block md:table-header-group">
                    <tr className="border border-gray-200 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative">
                      <th className="bg-gray-100 p-2 text-gray-700 font-bold md:border md:border-gray-200 block md:table-cell">
                        Mã Voucher
                      </th>
                      <th className="bg-gray-100 p-2 text-gray-700 font-bold md:border md:border-gray-200 block md:table-cell">
                        Mô tả
                      </th>
                      <th className="bg-gray-100 p-2 text-gray-700 font-bold md:border md:border-gray-200 block md:table-cell">
                        Giảm giá
                      </th>
                      <th className="bg-gray-100 p-2 text-gray-700 font-bold md:border md:border-gray-200 block md:table-cell">
                        Hạn sử dụng
                      </th>
                      <th className="bg-gray-100 p-2 text-gray-700 font-bold md:border md:border-gray-200 block md:table-cell">
                        Trạng thái
                      </th>

                      <th className="bg-gray-100 p-2 text-gray-700 font-bold md:border md:border-gray-200 block md:table-cell">
                        Hành động
                      </th>
                    </tr>
                  </thead>
                  <tbody className="block md:table-row-group">
                    {row.Vouchers.map((voucher) => (
                      <tr
                        key={voucher.UserVoucherID}
                        className="bg-white border border-gray-200 md:border-none block md:table-row"
                      >
                        <td className="p-2 md:border md:border-gray-200 block md:table-cell">
                          {voucher.VoucherCode}
                        </td>
                        <td className="p-2 md:border md:border-gray-200 block md:table-cell">
                          {voucher.Description}
                        </td>
                        <td className="p-2 md:border md:border-gray-200 block md:table-cell">
                          {voucher.Discount}%
                        </td>
                        <td className="p-2 md:border md:border-gray-200 block md:table-cell">
                          {new Date(voucher.ExpiryDate).toLocaleDateString()}
                        </td>
                        <td className="p-2 md:border md:border-gray-200 block md:table-cell">
                          <span
                            className={`font-medium ${
                              voucher.Active ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            {voucher.Active ? "Active" : "Inactive"}
                          </span>
                        </td>

                        <td className="p-2 md:border md:border-gray-200 block md:table-cell">
                          <button
                            onClick={() => {
                              deleteUserVoucher(voucher.UserVoucherID)
                                .then(() => window.location.reload())
                                .catch((error) =>
                                  console.error(
                                    "Error deleting user voucher:",
                                    error
                                  )
                                );
                            }}
                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-700"
                          >
                            Xoá
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
