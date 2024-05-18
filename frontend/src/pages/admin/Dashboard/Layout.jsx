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
            <MenuItem icon={TiviIcon} text="Quản lí rạp" path="cinema" />
            <MenuItem
              icon={FourKIcon}
              text="Quản lí phòng chiếu"
              path="cinemahall"
            />
            <MenuItem
              icon={ShopIcon}
              text={"Quản lý suất chiếu"}
              path={"showtime"}
            />
            <MenuItem icon={CommandIcon} text={"Quản lý ghế"} path={"seat"} />
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
                    d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              Settings
            </div>
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
        <div className="flex flex-col w-full h-full p-4 bg-gray-100">
          <Outlet />
        </div>
      </div>
    </>
  );
}
