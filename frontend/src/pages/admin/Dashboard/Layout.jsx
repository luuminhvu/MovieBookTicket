/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import HomeIcon from "../../../components/icons/Home";
import MenuItem from "../../../components/common/MenuItem";
export default function Sidebar() {
  const [sidebar, setSidebar] = useState(null);
  const [maxSidebar, setMaxSidebar] = useState(null);
  const [miniSidebar, setMiniSidebar] = useState(null);
  const [roundout, setRoundout] = useState(null);
  const [maxToolbar, setMaxToolbar] = useState(null);
  const [logo, setLogo] = useState(null);
  const [content, setContent] = useState(null);
  const [moon, setMoon] = useState(null);
  const [sun, setSun] = useState(null);
  const navigate = useNavigate();
  const setDark = (val) => {
    if (val === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const openNav = () => {
    if (sidebar.classList.contains("-translate-x-48")) {
      sidebar.classList.remove("-translate-x-48");
      sidebar.classList.add("translate-x-none");
      maxSidebar.classList.remove("hidden");
      maxSidebar.classList.add("flex");
      miniSidebar.classList.remove("flex");
      miniSidebar.classList.add("hidden");
      maxToolbar.classList.add("translate-x-0");
      maxToolbar.classList.remove("translate-x-24", "scale-x-0");
      logo.classList.remove("ml-12");
      content.classList.remove("ml-12");
      content.classList.add("ml-12", "md:ml-60");
    } else {
      sidebar.classList.add("-translate-x-48");
      sidebar.classList.remove("translate-x-none");
      maxSidebar.classList.add("hidden");
      maxSidebar.classList.remove("flex");
      miniSidebar.classList.add("flex");
      miniSidebar.classList.remove("hidden");
      maxToolbar.classList.add("translate-x-24", "scale-x-0");
      maxToolbar.classList.remove("translate-x-0");
      logo.classList.add("ml-12");
      content.classList.remove("ml-12", "md:ml-60");
      content.classList.add("ml-12");
    }
  };

  useEffect(() => {
    setSidebar(document.querySelector("aside"));
    setMaxSidebar(document.querySelector(".max"));
    setMiniSidebar(document.querySelector(".mini"));
    setRoundout(document.querySelector(".roundout"));
    setMaxToolbar(document.querySelector(".max-toolbar"));
    setLogo(document.querySelector(".logo"));
    setContent(document.querySelector(".content"));
    setMoon(document.querySelector(".moon"));
    setSun(document.querySelector(".sun"));
  }, []);

  return (
    <div className="body bg-white">
      <div className="fixed w-full z-1 flex bg-white dark:bg-[#0F172A] p-2 items-center justify-center h-16 px-10">
        <div className="logo ml-12 dark:text-white transform ease-in-out duration-500 flex-none h-full flex items-center justify-center">
          Cinema Management
        </div>

        <div className="grow h-full flex items-center justify-center"></div>
        <div className="flex-none h-full text-center flex items-center justify-center">
          <div className="flex space-x-3 items-center px-3">
            {/* <div className="flex-none flex justify-center">
              <div className="w-8 h-8 flex ">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShta_GXR2xdnsxSzj_GTcJHcNykjVKrCBrZ9qouUl0usuJWG2Rpr_PbTDu3sA9auNUH64&usqp=CAU"
                  alt="profile"
                  className="shadow rounded-full object-cover"
                />
              </div>
            </div>

            <div className="hidden md:block text-sm md:text-md text-black dark:text-white">
              John Doe
            </div> */}
          </div>
        </div>
      </div>
      <aside className="w-60 -translate-x-48 fixed transition transform ease-in-out duration-1000 z-50 flex h-screen bg-[#1E293B] ">
        <div className="max-toolbar translate-x-24 scale-x-0 w-full -right-6 transition transform ease-in duration-300 flex items-center justify-between border-4 border-white dark:border-[#0F172A] bg-[#1E293B]  absolute top-2 rounded-full h-12">
          <div className="flex pl-4 items-center space-x-2 ">
            <div>
              <div
                onClick={() => setDark("dark")}
                className="moon text-white hover:text-blue-500 dark:hover:text-[#38BDF8]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                  />
                </svg>
              </div>
              <div
                onClick={() => setDark("light")}
                className="sun hidden text-white hover:text-blue-500 dark:hover:text-[#38BDF8]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                  />
                </svg>
              </div>
            </div>
            <div className="text-white hover:text-blue-500 dark:hover:text-[#38BDF8]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                />
              </svg>
            </div>
          </div>
          <div className="flex items-center space-x-3 group bg-gradient-to-r dark:from-cyan-500 dark:to-blue-500 from-indigo-500 via-purple-500 to-purple-500  pl-10 pr-2 py-1 rounded-full text-white  ">
            <div className="transform ease-in-out duration-300 mr-12">
              Cinema
            </div>
          </div>
        </div>
        <div
          onClick={() => openNav()}
          className="-right-6 transition transform ease-in-out duration-500 flex border-4 border-white dark:border-[#0F172A] bg-[#1E293B] dark:hover:bg-blue-500 hover:bg-purple-500 absolute top-2 p-3 rounded-full text-white hover:rotate-45"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
            />
          </svg>
        </div>
        <div className="max hidden text-white mt-20 flex-col space-y-2 w-full h-[calc(100vh)]">
          <MenuItem text="Dashboard" icon={HomeIcon} path={"dashboard"} />
          <MenuItem text="Quản lý suất chiếu" icon={HomeIcon} path={"show"} />
          <MenuItem text="Quản lý đặt vé" icon={HomeIcon} path={"ticket"} />
          <MenuItem text="Quản lý phim" icon={HomeIcon} path={"movie"} />
          <MenuItem text="Quản lý rạp" icon={HomeIcon} path={"cinema"} />
          <MenuItem
            text="Quản lý phòng chiếu"
            icon={HomeIcon}
            path={"cinemahall"}
          />
          <MenuItem text="Quản lý thành viên" icon={HomeIcon} path={"user"} />
          <MenuItem
            text="Quản lý khung giờ"
            icon={HomeIcon}
            path={"time-frame"}
          />
          <MenuItem text={"Quản lý ghế"} icon={HomeIcon} path={"seat"} />
        </div>
        <div className="mini mt-20 flex flex-col space-y-2 w-full h-[calc(100vh)]">
          <div className="hover:ml-4 justify-end pr-5 text-white hover:text-purple-500 dark:hover:text-blue-500 w-full bg-[#1E293B] p-3 rounded-full transform ease-in-out duration-300 flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
          </div>
          <div className="hover:ml-4 justify-end pr-5 text-white hover:text-purple-500 dark:hover:text-blue-500 w-full bg-[#1E293B] p-3 rounded-full transform ease-in-out duration-300 flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
              />
            </svg>
          </div>
          <div className="hover:ml-4 justify-end pr-5 text-white hover:text-purple-500 dark:hover:text-blue-500 w-full bg-[#1E293B] p-3 rounded-full transform ease-in-out duration-300 flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z"
              />
            </svg>
          </div>
        </div>
      </aside>
      <div className="content ml-12 transform ease-in-out duration-500 pt-20 px-2 md:px-5 pb-4 ">
        {/* <nav
          className="flex px-5 py-3 text-gray-700 rounded-lg bg-gray-50 dark:bg-[#1E293B] "
          aria-label="Breadcrumb"
        >
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link
                to="/"
                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                </svg>
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  class="w-6 h-6 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <Link
                  to="/table"
                  className="ml-4 text-sm font-medium text-gray-900 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  Table
                </Link>
              </div>
            </li>
          </ol>
        </nav> */}
        <div className="flex flex-wrap my-5 -mx-2">
          <Outlet />
        </div>
      </div>
    </div>
  );
}