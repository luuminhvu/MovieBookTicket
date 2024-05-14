import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OptionIcon from "../icons/Options";
import VietnamIcon from "../icons/Vietnam";
import UnitedKingDomIcon from "../icons/UnitedKingdom";
import { AVATAR_DEFAULT, generateNavLinks } from "../../constants/define";
import i18n from "i18next";
import useLanguageState from "../../stores/languageState";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Quit from "../icons/Quit";
import { logout } from "../../stores/authSlice";
import { getUserInfo } from "../../services/function";
import Logo from "../icons/Logo";
const Header = () => {
  const UserID = useSelector((state) => state.auth.userId);
  const [user, setUser] = useState([]);
  const auth = useSelector((state) => state.auth);
  const role = useSelector((state) => state.auth.role);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [hiddenMenu, setHiddenMenu] = useState(false);
  const { t } = useTranslation();
  const navLinks = generateNavLinks(t);
  const { currentLanguage } = useLanguageState();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!UserID) return;
        const user = await getUserInfo(UserID);
        setUser(user);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [UserID]);

  const [isVietnamese, setIsVietnamese] = useState(currentLanguage === "vie");
  const handleClickLanguage = () => {
    setIsVietnamese(!isVietnamese);
    if (isVietnamese) {
      i18n.changeLanguage("eng");
    } else {
      i18n.changeLanguage("vie");
    }
  };

  window.addEventListener("click", (e) => {
    if (e.target.closest("header")) return;
    setIsMenuOpen(false);
  });
  const handleClickHiddenMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 relative">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link
            onClick={handleClickHiddenMenu}
            to="/"
            className="flex items-center"
          >
            <Logo />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Beta Cinemars
            </span>
          </Link>
          <div className="flex items-center lg:order-2">
            {auth.username ? (
              <>
                <div
                  onClick={() => setHiddenMenu(!hiddenMenu)}
                  className="text-gray-800 dark:text-white flex relative"
                >
                  <img
                    src={user?.Avatar ? user?.Avatar : AVATAR_DEFAULT}
                    className="w-8 h-8 rounded-full mr-2 object-cover object-center"
                    alt="avatar"
                  />
                  <span className="items-center justify-center hidden lg:flex">
                    {auth.username}
                  </span>
                  <div
                    className={`absolute top-11 z-50 ${
                      hiddenMenu ? "block" : "hidden"
                    }`}
                  >
                    <ul className="text-black dark:bg-white border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-1.5 w-48">
                      <li>
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-sm border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100"
                        >
                          Thông tin cá nhân
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/orders"
                          className="block px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          Vé đã đặt
                        </Link>
                      </li>
                      {role === "admin" && (
                        <li>
                          <Link
                            to="/admin/dashboard"
                            className="block text-red-500 px-4 py-2 text-sm hover:bg-gray-100"
                          >
                            Quản trị hệ thống
                          </Link>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>

                <button
                  className="mx-2 text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                  onClick={handleLogout}
                >
                  <Quit />
                </button>
              </>
            ) : (
              <>
                <Link
                  onClick={handleClickHiddenMenu}
                  to="/login"
                  className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-0 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                >
                  {t("login")}
                </Link>
                <Link
                  onClick={handleClickHiddenMenu}
                  to="/register"
                  className="text-white bg-blue-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-2 lg:px-5 py-2 lg:py-2.5 mr-1 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                >
                  {t("register")}
                </Link>
              </>
            )}
            <button
              type="button"
              className="inline-flex items-center p-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              onClick={toggleMenu}
            >
              <OptionIcon />
            </button>
            <button onClick={handleClickLanguage} className="">
              {!isVietnamese ? <VietnamIcon /> : <UnitedKingDomIcon />}
            </button>
          </div>
          <div
            className={`absolute top-full inset-x-0 lg:hidden ${
              isMenuOpen ? "block" : "hidden"
            }`}
            style={{ backgroundColor: "rgba(0, 0, 0, 0.8)", zIndex: 99 }}
          >
            {/* Mobile menu */}
            <ul className="flex flex-col text-black">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.link}
                    className="block py-2 pr-4 pl-3 text-white rounded font-bold hover:bg-gray-700 lg:hover:bg-transparent lg:text-gray-700 lg:p-0 dark:text-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1">
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0 z-50">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.link}
                    className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-50 lg:hover:bg-transparent lg:text-gray-700 lg:p-0 dark:text-gray-200 dark:hover:bg-gray-700"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
