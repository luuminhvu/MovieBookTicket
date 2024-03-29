import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrder } from "../../stores/orderSlice";
import dayjs from "dayjs";
const Order = () => {
  const UserID = useSelector((state) => state.auth.userId);
  const orders = useSelector((state) => state.order.orders);
  console.log(orders);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchOrder(UserID));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <section class="py-12 relative">
        <div class="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
          <h2 class="font-manrope font-bold text-4xl leading-10 text-black text-center">
            Vé đã đặt
          </h2>
          <p class="mt-4 font-normal text-lg leading-8 text-gray-500 mb-11 text-center">
            Đây là danh sách các vé bạn đã đặt
          </p>
          <div>
            {orders.length > 0 ? (
              orders.map((order) => (
                <div
                  key={order.BookingID}
                  className="main-box border mb-4 border-gray-200 rounded-xl pt-6 max-w-xl max-lg:mx-auto lg:max-w-full"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between px-6 pb-6 border-b border-gray-200">
                    <div className="data">
                      <p className="font-semibold text-base leading-7 text-black">
                        Order Id:{" "}
                        <span className="text-indigo-600 font-medium">
                          #{order.BookingID}
                        </span>
                      </p>
                      <p className="font-semibold text-base leading-7 text-black mt-4">
                        Order Payment:{" "}
                        <span className="text-black font-medium">
                          {dayjs(order.BookingDate).format(
                            "DD/MM/YYYY HH:mm:ss"
                          )}
                        </span>
                      </p>
                      <p className="font-semibold text-base leading-7 text-black mt-4">
                        Rạp chiếu:{" "}
                        <span className="text-black font-medium">
                          {order.CinemaName}
                        </span>
                      </p>
                    </div>
                    <button className="rounded-full py-3 px-7 font-semibold text-sm leading-7 text-white bg-indigo-600 max-lg:mt-5 shadow-sm shadow-transparent transition-all duration-500 hover:bg-indigo-700 hover:shadow-indigo-400">
                      Track Your Order
                    </button>
                  </div>
                  <div className="w-full px-3 min-[400px]:px-6">
                    <div class="flex flex-col lg:flex-row items-center py-6 border-b border-gray-200 gap-6 w-full">
                      <div class="img-box max-lg:w-full">
                        <img
                          src={order.Poster}
                          alt="Premium Watch image"
                          className="aspect-square w-full lg:max-w-[140px] lg:h-[140px] object-full rounded-lg"
                        />
                      </div>
                      <div class="flex flex-row items-center w-full ">
                        <div class="grid grid-cols-1 lg:grid-cols-2 w-full">
                          <div class="flex items-center">
                            <div class="">
                              <h2 class="font-semibold text-xl leading-8 text-black mb-3">
                                {order.MovieName}
                              </h2>
                              <span class="font-normal text-sm leading-8 text-gray-500 mr-3 bg-gray-200 px-2 py-1 rounded-full">
                                {order.Duration} phút
                              </span>{" "}
                              <span class="font-normal text-sm leading-8 text-white bg-red-500 px-2 py-1 rounded-full">
                                T{order.Age}
                              </span>
                              <div class="flex items-center ">
                                <p class="font-medium text-base leading-7 text-black pr-4 mr-4 border-r border-gray-200">
                                  Ghế:{" "}
                                  <span class="text-gray-500">
                                    {order.SeatNames}
                                  </span>
                                </p>
                                <p className="font-medium text-base leading-7 text-black">
                                  Số vé:{" "}
                                  <span className="text-gray-500">
                                    {order.CinemaSeatIDs.split(",").length}
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                          <div class="grid grid-cols-5">
                            <div class="col-span-5 lg:col-span-1 flex items-center max-lg:mt-3">
                              <div class="flex gap-3 lg:block">
                                <p class="font-medium text-sm leading-7 text-black">
                                  Phòng chiếu
                                </p>
                                <p class="lg:mt-4 font-medium text-sm leading-7 text-indigo-600">
                                  {order.CinemaHallName}
                                </p>
                              </div>
                            </div>
                            <div class="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3 ">
                              <div class="flex gap-3 lg:block">
                                <p class="font-medium text-sm leading-7 text-black">
                                  Giờ chiếu
                                </p>
                                <p class="font-medium text-sm leading-6 whitespace-nowrap py-0.5 px-3 rounded-full lg:mt-3 bg-emerald-50 text-red-600">
                                  {order.StartTime.slice(0, 5)}
                                </p>
                              </div>
                            </div>
                            <div class="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3">
                              <div class="flex gap-3 lg:block">
                                <p class="font-medium text-sm whitespace-nowrap leading-6 text-black">
                                  Ngày chiếu
                                </p>
                                <p class="font-medium text-base whitespace-nowrap leading-7 lg:mt-3 text-emerald-500">
                                  {dayjs(order.Date).format("DD/MM/YYYY")}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="w-full border-t border-gray-200 px-6 flex flex-col lg:flex-row items-center justify-between ">
                    <div class="flex flex-col sm:flex-row items-center max-lg:border-b border-gray-200">
                      <button class="flex outline-0 py-6 sm:pr-6  sm:border-r border-gray-200 whitespace-nowrap gap-2 items-center justify-center font-semibold group text-lg text-black bg-white transition-all duration-500 hover:text-indigo-600">
                        <svg
                          class="stroke-black transition-all duration-500 group-hover:stroke-indigo-600"
                          xmlns="http://www.w3.org/2000/svg"
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                        >
                          <path
                            d="M5.5 5.5L16.5 16.5M16.5 5.5L5.5 16.5"
                            stroke=""
                            stroke-width="1.6"
                            stroke-linecap="round"
                          />
                        </svg>
                        Cancel Order
                      </button>
                      <p class="font-medium text-lg text-gray-900 pl-6 py-3 max-lg:text-center">
                        Paid using Credit Card{" "}
                        <span class="text-gray-500">ending with 8822</span>
                      </p>
                    </div>
                    <p class="font-semibold text-lg text-black py-6">
                      Total Price:{" "}
                      <span class="text-indigo-600">
                        {order.TotalPrice} VNĐ
                      </span>
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center">No orders found</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Order;
