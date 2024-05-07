import React, { useEffect, useState } from "react";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { forgotPassword } from "../../../services/function";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../stores/loadingSlice";
const ModalResetPassword = ({ setOpenModal }) => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);
  const validate = () => {
    const captcha = document.getElementById("captcha").value;
    if (captcha === "") {
      alert("Please enter the captcha");
      return false;
    } else {
      if (validateCaptcha(captcha) === true) {
        alert("Captcha Matched");
        return true;
      } else {
        alert("Captcha does not match");
        return false;
      }
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(setLoading(true));
      try {
        await forgotPassword(email);
        dispatch(setLoading(false));
        setOpenModal(false);
      } catch (error) {
        dispatch(setLoading(false));
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div
        onClick={() => setOpenModal(false)}
        className="modal-overlay absolute inset-0 bg-black opacity-50"
      ></div>
      <div className="modal-container bg-white w-96 mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div className="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-50">
          <svg
            className="fill-current text-white"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
          >
            <path d="M18 1.4L16.6 0 9 7.6 1.4 0 0 1.4 7.6 9 0 16.6 1.4 18 9 10.4 16.6 18l1.4-1.4L10.4 9 18 1.4z" />
          </svg>
        </div>

        <h2 className="modal-title text-xl font-semibold text-center my-4">
          Reset Password
        </h2>

        <form onSubmit={handleSubmit} className="modal-content px-6 py-4">
          <div className="form-group">
            <label htmlFor="email" className="block text-sm font-semibold mb-1">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className="w-full border rounded py-2 px-3"
              required
            />
          </div>

          <div className="form-group">
            <label
              htmlFor="captcha"
              className="block text-sm font-semibold mb-1"
            >
              Captcha:
            </label>
            <div className="flex items-center">
              <LoadCanvasTemplate />
              <input
                type="text"
                id="captcha"
                className="w-full border rounded py-2 px-3"
                placeholder="Enter captcha"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded mt-4 flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
              />
            </svg>
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalResetPassword;
