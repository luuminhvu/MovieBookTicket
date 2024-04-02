import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserInfo, updateAvatar } from "../../services/function";
import linhchi from "../../assets/images/chinam.jpg";
import Modal from "../../components/common/Modal";
import { useRef } from "react";

import dayjs from "dayjs";
import api from "../../utils/api";
import axios from "axios";
import { toast } from "react-toastify";
import ModalPassword from "../../components/common/ModalChangePassword";
const Profile = () => {
  const UserID = useSelector((state) => state.auth.userId);
  const [showModal, setShowModal] = useState(false);
  const [showModalPassword, setShowModalPassword] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [user, setUser] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getUserInfo(UserID);
        setUser(user);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    transformFile(file);
  };
  const transformFile = (file) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
    } else {
      setAvatar("");
    }
  };
  const handleChangeAvatar = async (avatar, UserID) => {
    try {
      const res = await updateAvatar(avatar, UserID);
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="">
        <h1 className="text-2xl text-center bg-black text-white py-5">
          Thông tin chung
        </h1>
      </div>
      <div className="bg-gray-100">
        <div className="container mx-auto p-5">
          <div className="md:flex no-wrap md:-mx-2 ">
            {/* Left Side */}
            <div className="w-full md:w-3/12 md:mx-2">
              {/* Profile Card */}
              <div className="bg-white p-3 border-t-4 border-green-400">
                <div className="image overflow-hidden">
                  <img
                    className="mx-auto rounded-full w-56 h-56"
                    src={avatar ? avatar : user.Avatar}
                    alt=""
                  />
                </div>
                <h1 className="text-gray-900 text-center font-bold text-xl leading-8 my-1">
                  {user.FullName}
                </h1>
                <p className="text-sm text-center text-gray-500 hover:text-gray-600 leading-6">
                  {user?.Description}
                </p>
                <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                  <li className="flex items-center py-3">
                    <span>Status</span>
                    <span className="ml-auto">
                      <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">
                        Active
                      </span>
                    </span>
                  </li>
                  <li className="flex items-center py-3">
                    <span>Member since</span>
                    <span className="ml-auto">
                      {dayjs(user.DateRegister).format("DD/MM/YYYY")}
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="w-full md:w-9/12 mx-2 h-auto">
              <div className="bg-white p-3 shadow-sm rounded-sm">
                <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                  <span className="text-green-500">
                    <svg
                      className="h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </span>
                  <span className="tracking-wide">About</span>
                </div>
                <div className="text-gray-700">
                  <div className="grid md:grid-cols-2 text-sm">
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Username</div>
                      <div className="px-4 py-2">{user.Username}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Fullname</div>
                      <div className="px-4 py-2">{user.FullName}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Gender</div>
                      <div className="px-4 py-2">Male</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Contact No.</div>
                      <div className="px-4 py-2">0{user.Phone}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">
                        Current Address
                      </div>
                      <div className="px-4 py-2">{user.Address}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Role</div>
                      <div className="px-4 py-2">{user.Role}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Email.</div>
                      <div className="px-4 py-2">
                        <a
                          className="text-blue-800"
                          href="mailto:jane@example.com"
                        >
                          {user.Email}
                        </a>
                      </div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Birthday</div>
                      <div className="px-4 py-2">
                        {dayjs(user.Birthday).format("DD/MM/YYYY")}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-gray-900 mt-4">
                  <button
                    onClick={() => setShowModal(true)}
                    className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setShowModalPassword(true)}
                    className="bg-red-500 hover:bg-red-700 text-white py-1 px-1 rounded"
                  >
                    Change Password
                  </button>
                  <input
                    type="file"
                    placeholder="Hình ảnh sản phẩm"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                  />
                  <button
                    onClick={() => handleChangeAvatar(avatar, UserID)}
                    className="bg-green-500 hover:bg-green-700 text-white py-1 px-1 rounded"
                  >
                    Change Avatar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModal && <Modal id={UserID} setOpenModal={setShowModal} />}
      {showModalPassword && (
        <ModalPassword id={UserID} setOpenModal={setShowModalPassword} />
      )}
    </>
  );
};

export default Profile;
