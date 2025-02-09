import React, { useState } from "react";
import { BsFillMenuButtonWideFill } from "react-icons/bs";
import { IoHome, IoSettingsSharp } from "react-icons/io5";
import { MdMessage, MdGroups2, MdAccountCircle } from "react-icons/md";
import { FaUserFriends, FaSignOutAlt, FaUserTie } from "react-icons/fa";
import { PiUserListFill } from "react-icons/pi";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link, useLocation } from "react-router";
import { useEffect } from "react";
import { Button } from "@material-tailwind/react";
import { getAuth, signOut } from "firebase/auth";
import { userLoginInfo } from "../slices/userSlices";
import { ToastContainer, toast, Bounce } from "react-toastify";

const Sidebar = () => {
  const location = useLocation();
  const auth = getAuth();
  // useSelector use for get data from redux
  const userdata = useSelector((state) => state.userInfo.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutPopup, setLogoutPopup] = useState(false);
  useEffect(() => {
    if (!userdata) {
      navigate("/login");
    }
  }, []);
  const handleLogout = () => {
    setLogoutPopup(!logoutPopup);
  };
  const logout = () => {
    signOut(auth)
      .then(() => {
        console.log("signout");
        localStorage.removeItem("userInfo");
        dispatch(userLoginInfo(""));
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      {logoutPopup && (
        <div className="p-6 mt-3 bg-gray-300 rounded-xl absolute left-2/4 translate-x-[-50%] z-50">
          <Button
            onClick={logout}
            className={`bg-green-500 text-[17px] font-bold`}
          >
            Yes
          </Button>
          <Button
            onClick={() => setLogoutPopup(false)}
            className={`bg-red-500 text-[17px] font-bold ml-3`}
          >
            No
          </Button>
        </div>
      )}
      <div className="lg:hidden 2xl:hidden xl:hidden md:hidden sm:flex xxs:flex flex-col items-center w-16 h-screen overflow-hidden text-gray-700 bg-gray-100 rounded pt-3">
        <BsFillMenuButtonWideFill className="hidden" />
        {userdata ? (
          <img
            src={userdata.photoURL}
            alt="avatar"
            className="relative inline-block h-[58px] w-[58px] !rounded-full object-cover object-center"
          />
        ) : (
          <img
            src="https://docs.material-tailwind.com/img/face-2.jpg"
            alt="avatar"
            className="relative inline-block h-[58px] w-[58px] !rounded-full object-cover object-center"
          />
        )}

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
          src={userdata?.photoURL}
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
              to={"/"}
              className={`${
                location.pathname == "/" && "bg-black text-white"
              } flex items-center w-full h-12 px-3 mt-2 rounded`}
              href="#"
            >
              <IoHome className="w-6 h-6 mr-1" />
              <span className="ml-2 text-base font-medium">Home</span>
            </Link>
            <Link
              to={"/messege"}
              className={`${
                location.pathname == "/messege" && "bg-black text-white"
              } flex items-center w-full h-12 px-3 mt-2 rounded`}
              href="#"
            >
              <MdMessage className="w-6 h-6 mr-1" />
              <span className="ml-2 text-base font-medium">Messeges</span>
            </Link>
            <Link
              to={"/friends"}
              className={`${
                location.pathname == "/friends" && "bg-black text-white"
              } flex items-center w-full h-12 px-3 mt-2 rounded`}
              href="#"
            >
              <FaUserFriends className="w-6 h-6 mr-1" />
              <span className="ml-2 text-base font-medium">Friends</span>
            </Link>
            <Link
              to={"/groups"}
              className={`${
                location.pathname == "/groups" && "bg-black text-white"
              } flex items-center w-full h-12 px-3 mt-2 rounded`}
              href="#"
            >
              <MdGroups2 className="w-6 h-6 mr-1" />
              <span className="ml-2 text-base font-medium">Groups</span>
            </Link>
            <Link
              to={"/userlist"}
              className={`${
                location.pathname == "/userlist" && "bg-black text-white"
              } flex items-center w-full h-12 px-3 mt-2 rounded`}
              href="#"
            >
              <PiUserListFill className="w-6 h-6 mr-1" />
              <span className="ml-2 text-base font-medium">Users</span>
            </Link>
            <Link
              className={`${
                location.pathname == "/profile" && "bg-black text-white"
              } flex items-center w-full h-12 px-3 mt-2 rounded`}
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
              onClick={handleLogout}
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
