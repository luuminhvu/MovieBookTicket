/* eslint-disable no-unused-vars */
import { Outlet } from "react-router-dom";
import MenuItem from "../../../components/common/MenuItem";
import Statistical from "../../../components/icons/Statistical";
import OrderIcon from "../../../components/icons/Order";
import ProfileIcon from "../../../components/icons/Profile";
import MovieIcon from "../../../components/icons/Movie";
import TiviIcon from "../../../components/icons/Tivi";
import FourKIcon from "../../../components/icons/4K";
import ShopIcon from "../../../components/icons/Shop";
import CommandIcon from "../../../components/icons/Command";
import Clock from "../../../components/icons/Clock";
import SettingIcon from "../../../components/icons/Setting";
import BookIcon from "../../../components/icons/Book";
import VoucherIcon from "../../../components/icons/Voucher";
import TicketDetailIocn from "../../../components/icons/TicketDetail";
export default function Sidebar() {
  return (
    <>
      <div className="flex h-[calc(100vh-2rem)]">
        <div className="flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 h-full w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
          <div className="mb-2 p-4">
            <h5 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-gray-900">
              Admin - Dashboard
            </h5>
          </div>
          <nav className="flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-gray-700">
            <MenuItem icon={Statistical} text="Dashboard" path="dashboard" />
            <MenuItem icon={OrderIcon} text="Quản lý đơn hàng" path={"order"} />

            <MenuItem icon={ProfileIcon} text="Quản lý tài khoản" path="user" />
            <MenuItem icon={MovieIcon} text="Quản lý phim" path="movie" />
            <MenuItem icon={TiviIcon} text="Quản lý rạp" path="cinema" />
            <MenuItem
              icon={FourKIcon}
              text="Quản lý phòng chiếu"
              path="cinemahall"
            />
            <MenuItem
              icon={ShopIcon}
              text={"Quản lý suất chiếu"}
              path={"showtime"}
            />
            <MenuItem icon={CommandIcon} text={"Quản lý ghế"} path={"seat"} />
            <MenuItem
              icon={Clock}
              text={"Quản lý thời gian"}
              path={"timeframe"}
            />
            <MenuItem
              icon={SettingIcon}
              text={"Setting Slider"}
              path={"slider"}
            />
            <MenuItem icon={BookIcon} text={"Quản lý tin tức"} path={"news"} />
            <MenuItem
              icon={VoucherIcon}
              text={"Quản lý voucher"}
              path={"vouchers"}
            />
            <MenuItem
              icon={TicketDetailIocn}
              text={"Quản lý voucher người dùng"}
              path={"voucher-user"}
            />
            <div
              role="button"
              tabIndex="0"
              className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
            >
              <div className="grid place-items-center mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2.25a.75.75 0 01.75.75v9a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM6.166 5.106a.75.75 0 010 1.06 8.25 8.25 0 1011.668 0 .75.75 0 111.06-1.06c3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788a.75.75 0 011.06 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              Log Out
            </div>
          </nav>
        </div>
        <div className="flex flex-col w-full h-full p-4 bg-gray-100 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </>
  );
}
