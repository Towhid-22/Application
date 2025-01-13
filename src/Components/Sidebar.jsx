import React from "react";
import { BsFillMenuButtonWideFill } from "react-icons/bs";
import { IoHome, IoSettingsSharp } from "react-icons/io5";
import { MdMessage, MdGroups2, MdAccountCircle } from "react-icons/md";
import { FaUserFriends, FaSignOutAlt, FaUserTie } from "react-icons/fa";
import { Link } from "react-router";
import { PiUserListFill } from "react-icons/pi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useEffect } from "react";

const Sidebar = () => {
  const userdata = useSelector((state) => state.userInfo.value);
  const navigate = useNavigate();
  useEffect(() => {
    if (!userdata) {
      navigate("/login");
    }
  });
  return (
    <div>
      <div className="lg:hidden 2xl:hidden xl:hidden md:hidden sm:flex xxs:flex flex-col items-center w-16 h-screen overflow-hidden text-gray-700 bg-gray-100 rounded pt-3">
        <BsFillMenuButtonWideFill className="hidden" />
        <img
          src={userdata.photoURL}
          alt="avatar"
          className="relative inline-block h-[58px] w-[58px] !rounded-full object-cover object-center"
        />
        {userdata && (
          <h1 className="text-center mt-3 font-semibold">
            {userdata.displayName}
          </h1>
        )}
        <div className="flex flex-col items-center w-full mt-3 border-t border-gray-300">
          <Link
            className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300"
            href="#"
          >
            <IoHome className="w-6 h-6 mr-1" />
          </Link>
          <Link
            className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300"
            href="#"
          >
            <MdMessage className="w-6 h-6 mr-1" />
          </Link>
          <Link
            className="flex items-center w-full h-12 px-3 mt-2 hover:bg-gray-300 rounded"
            href="#"
          >
            <FaUserFriends className="w-6 h-6 mr-1" />
          </Link>
          <Link
            className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300"
            href="#"
          >
            <MdGroups2 className="w-6 h-6 mr-1" />
          </Link>
          <Link
            className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300"
            href="#"
          >
            <PiUserListFill className="w-6 h-6 mr-1" />
          </Link>
          <Link
            className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300"
            href="#"
          >
            <FaUserTie className="w-6 h-6 mr-1" />
          </Link>
        </div>
        <div className="flex flex-col items-center w-full mt-2 border-t border-gray-300">
          <Link
            className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300"
            href="#"
          >
            <IoSettingsSharp className="w-6 h-6 mr-1" />
          </Link>
          <Link
            className="relative flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300"
            href="#"
          >
            <FaSignOutAlt className="w-6 h-6 mr-1" />
          </Link>
        </div>
        <Link
          className="flex items-center justify-center w-full h-16 mt-auto bg-gray-200 hover:bg-gray-300"
          href="#"
        >
          <MdAccountCircle className="w-6 h-6 mr-1" title="Account" />
        </Link>
      </div>

      <div className="hidden md:flex sm:hidden xxs:hidden lg:flex 2xl:flex xl:flex flex-col items-center w-40 h-screen overflow-hidden text-gray-700 bg-gray-100 pt-3 border-r-[2px] border-green-500">
        <img
          src={userdata.photoURL}
          alt="avatar"
          className="relative inline-block h-[58px] w-[58px] !rounded-full object-cover object-center"
        />
        {userdata && (
          <h1 className="text-center mt-3 font-semibold">
            {userdata.displayName}
          </h1>
        )}
        <div className="w-full px-2">
          <div className="flex flex-col items-center w-full mt-3 border-t border-gray-300">
            <Link
              className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300"
              href="#"
            >
              <IoHome className="w-6 h-6 mr-1" />
              <span className="ml-2 text-base font-medium">Home</span>
            </Link>
            <Link
              className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300"
              href="#"
            >
              <MdMessage className="w-6 h-6 mr-1" />
              <span className="ml-2 text-base font-medium">Messege</span>
            </Link>
            <Link
              className="flex items-center w-full h-12 px-3 mt-2 hover:bg-gray-300 rounded"
              href="#"
            >
              <FaUserFriends className="w-6 h-6 mr-1" />
              <span className="ml-2 text-base font-medium">Friends</span>
            </Link>
            <Link
              className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300"
              href="#"
            >
              <MdGroups2 className="w-6 h-6 mr-1" />
              <span className="ml-2 text-base font-medium">Groups</span>
            </Link>
            <Link
              className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300"
              href="#"
            >
              <PiUserListFill className="w-6 h-6 mr-1" />
              <span className="ml-2 text-base font-medium">Users</span>
            </Link>
            <Link
              className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300"
              href="#"
            >
              <FaUserTie className="w-6 h-6 mr-1" />

              <span className="ml-2 text-base font-medium">Profile</span>
            </Link>
          </div>
          <div className="flex flex-col items-center w-full mt-2 border-t border-gray-300">
            <Link
              className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300"
              href="#"
            >
              <IoSettingsSharp className="w-6 h-6 mr-1" />
              <span className="ml-2 text-base font-medium">Settings</span>
            </Link>
            <Link
              className="relative flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300"
              href="#"
            >
              <FaSignOutAlt className="w-6 h-6 mr-1" />
              <span className="ml-2 text-base font-medium">Logout</span>
            </Link>
          </div>
        </div>
        <Link
          className="flex items-center justify-center w-full h-16 mt-auto bg-gray-200 hover:bg-gray-300"
          href="#"
        >
          <MdAccountCircle className="w-6 h-6 mr-1" />
          <span className="ml-2 text-base font-medium">Account</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
