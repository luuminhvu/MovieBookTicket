import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import FacebookIcon from "../../components/icons/Facebook";
import GoogleIcon from "../../components/icons/Google";

export default function Register() {
  const { t } = useTranslation();
  return (
    <div>
      <div className="flex flex-col items-center min-h-[90vh] pt-6 sm:justify-center sm:pt-0 bg-gray-50">
        <div>
          <Link to="/">
            <h3 className="text-4xl font-bold text-black">{t("register")}</h3>
          </Link>
        </div>
        <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg">
          <form>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                {t("name")}
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                {t("emailAddress")}
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="email"
                  className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                {t("password")}
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="password"
                  className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="password_confirmation"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                {t("confirmPassword")}
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="password"
                  className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
            </div>
            <Link to="" className="text-xs text-blue-500 hover:underline">
              {t("forgotPassword")}
            </Link>
            <div className="flex z-1 items-center mt-4">
              <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-black rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                {t("register")}
              </button>
            </div>
          </form>
          <div className="mt-4 text-grey-600">
            {t("alreadyHaveAnAccount")}{" "}
            <span>
              <Link className="text-blue-500 hover:underline" href="#">
                {t("login")}
              </Link>
            </span>
          </div>
          <div className="flex items-center w-full my-4">
            <hr className="w-full" />
            <p className="px-3 ">{t("or")}</p>
            <hr className="w-full" />
          </div>
          <div className="my-6 space-y-2">
            <button
              aria-label="Login with Google"
              type="button"
              className="flex items-center justify-center w-full p-2 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-400 focus:ring-violet-400"
            >
              <GoogleIcon />
              <p>{t("loginWithGoogle")}</p>
            </button>
            <button
              aria-label="Login with GitHub"
              className="flex items-center justify-center w-full p-2 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-400 focus:ring-violet-400"
            >
              <FacebookIcon />
              <p>{t("loginWithFacebook")}</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
