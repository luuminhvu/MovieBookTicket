import React, { useEffect, useState } from "react";
import FacebookIcon from "../../components/icons/Facebook";
import GoogleIcon from "../../components/icons/Google";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Eye from "../../components/icons/Eye";
import EyeSlash from "../../components/icons/EyeSlash";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../stores/authSlice";
import { useNavigate } from "react-router-dom";
import { setLoading } from "../../stores/loadingSlice";
import { showToast } from "../../components/common/Toast";
import ModalResetPassword from "../../components/common/Modal/ModalResetPassword";
export default function Login() {
  const auth = useSelector((state) => state.auth);
  const [openModal, setOpenModal] = useState(false);

  const navigate = useNavigate();
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const values = { email, password };
  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      const res = await dispatch(login(values));
      dispatch(setLoading(false));
      showToast(res.payload.message, res.payload.status);
    } catch (error) {
      dispatch(setLoading(false));
    }
  };
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    if (auth.username) {
      navigate("/");
    }
  }, [auth.username, navigate]);
  return (
    <div className="relative flex flex-col justify-center min-h-[80vh] overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-black uppercase">
          {t("login")}
        </h1>
        <form className="mt-6">
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              {t("emailAddress")}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              {t("password")}
            </label>
            <div className="flex">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-black bg-white focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40 border rounded-md"
              />
              <div
                className="px-4 py-2 mt-2 ml-1 text-black bg-white rounded-md flex items-center justify-center cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeSlash /> : <Eye />}
              </div>
            </div>
          </div>
          <div
            onClick={() => setOpenModal(true)}
            className="text-xs text-blue-500 hover:underline"
          >
            {t("forgotPassword")}
          </div>
          <div className="mt-6">
            <button
              onClick={handleSubmitLogin}
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-black rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
            >
              {t("login")}
            </button>
          </div>
        </form>
        <div className="relative flex items-center justify-center w-full mt-6 border border-t">
          <div className="absolute px-5 bg-white">{t("or")}</div>
        </div>
        <div className="flex mt-4 gap-x-2">
          <button
            type="button"
            className="flex items-center justify-center w-full p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-violet-600"
          >
            <GoogleIcon />
          </button>
          {/* <button className="flex items-center justify-center w-full p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-violet-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              className="w-5 h-5 fill-current"
            >
              <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z"></path>
            </svg>
          </button> */}
          <button
            type="button"
            className="flex items-center justify-center w-full p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-violet-600"
          >
            <FacebookIcon />
          </button>
        </div>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          {" "}
          {t("dontHaveAnAccount")}{" "}
          <Link
            to="/register"
            className="font-medium text-blue-500 hover:underline"
          >
            {t("registerQuick")}
          </Link>
        </p>
      </div>
      {openModal && <ModalResetPassword setOpenModal={setOpenModal} />}
    </div>
  );
}
