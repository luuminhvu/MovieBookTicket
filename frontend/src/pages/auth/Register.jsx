import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import FacebookIcon from "../../components/icons/Facebook";
import GoogleIcon from "../../components/icons/Google";
import Eye from "../../components/icons/Eye";
import EyeSlash from "../../components/icons/EyeSlash";
import { register } from "../../stores/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { setLoading } from "../../stores/loadingSlice";
import { showToast } from "../../components/common/Toast";
export default function Register() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);
  useEffect(() => {
    if (auth.username) {
      navigate("/");
    }
  }, [auth.username, navigate]);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(6, t("tooShort"))
        .max(50, t("tooLong"))
        .required(t("required")),
      email: Yup.string().email(t("invalidEmail")).required(t("required")),
      password: Yup.string()
        .min(6, t("tooShort"))
        .max(50, t("tooLong"))
        .required(t("required")),
      passwordConfirmation: Yup.string()
        .oneOf([Yup.ref("password"), null], t("passwordMustMatch"))
        .required(t("required")),
    }),
    onSubmit: async (values) => {
      dispatch(setLoading(true));
      try {
        const res = await dispatch(register(values));
        dispatch(setLoading(false));
        showToast(res.payload.message, res.payload.status);
      } catch (error) {
        dispatch(setLoading(false));
      }
    },
  });
  return (
    <div>
      <div className="flex flex-col items-center min-h-[90vh] pt-6 sm:justify-center sm:pt-0 bg-gray-50">
        <div>
          <Link to="/">
            <h3 className="text-4xl font-bold text-black">{t("register")}</h3>
          </Link>
        </div>
        <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg">
          <form onSubmit={formik.handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                {t("name")}
              </label>
              <div className="flex flex-col items-start">
                <input
                  name="username"
                  value={formik.values.username}
                  type="text"
                  onChange={formik.handleChange}
                  className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              {formik.errors.username && formik.touched.username && (
                <p className="text-sx text-red-500">{formik.errors.username}</p>
              )}
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
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  type="email"
                  className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              {formik.errors.email && formik.touched.email && (
                <p className="text-sx text-red-500">{formik.errors.email}</p>
              )}
            </div>
            <div className="mt-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                {t("password")}
              </label>
              <div className="flex">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
                <div
                  className="px-4 py-2 mt-2 ml-1 text-black bg-white rounded-md flex items-center justify-center cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeSlash /> : <Eye />}
                </div>
              </div>
              {formik.errors.password && formik.touched.password && (
                <p className="text-sx text-red-500">{formik.errors.password}</p>
              )}
            </div>
            <div className="mt-4">
              <label
                htmlFor="password_confirmation"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                {t("confirmPassword")}
              </label>
              <div className="flex">
                <input
                  name="passwordConfirmation"
                  value={formik.values.passwordConfirmation}
                  onChange={formik.handleChange}
                  type={showPasswordConfirmation ? "text" : "password"}
                  className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
                <div
                  className="px-4 py-2 mt-2 ml-1 text-black bg-white rounded-md flex items-center justify-center cursor-pointer"
                  onClick={() =>
                    setShowPasswordConfirmation(!showPasswordConfirmation)
                  }
                >
                  {showPasswordConfirmation ? <EyeSlash /> : <Eye />}
                </div>
              </div>
              {formik.errors.passwordConfirmation &&
                formik.touched.passwordConfirmation && (
                  <p className="text-sx text-red-500">
                    {formik.errors.passwordConfirmation}
                  </p>
                )}
            </div>
            {/* <Link to="" className="text-xs text-blue-500 hover:underline">
              {t("forgotPassword")}
            </Link> */}
            <div className="flex z-1 items-center mt-4">
              <button
                type="submit"
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-black rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
              >
                {t("register")}
              </button>
            </div>
          </form>
          <div className="mt-4 text-grey-600">
            {t("alreadyHaveAnAccount")}{" "}
            <span>
              <Link
                to="/login"
                className="text-blue-500 hover:underline"
                href="#"
              >
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
              type="button"
              className="flex items-center justify-center w-full p-2 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-400 focus:ring-violet-400"
            >
              <GoogleIcon />
              <p>{t("loginWithGoogle")}</p>
            </button>
            <button className="flex items-center justify-center w-full p-2 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-400 focus:ring-violet-400">
              <FacebookIcon />
              <p>{t("loginWithFacebook")}</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
