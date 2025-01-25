import React, { useEffect } from "react";
import Friends from "../Components/Friends";
import UserList from "../Components/UserList";
import Messege from "../Components/Messege";
import Group from "../Components/Group";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import FriendRequest from "../Components/FriendRequest";
import PracticeOne from "../Components/PracticeOne";
import PracticeTwo from "../Components/PracticeTwo";
import PracticeThree from "../Components/PracticeThree";

const Home = () => {
  const userdata = useSelector((state) => state.userInfo.value);
  const navigate = useNavigate();
  useEffect(() => {
    if (!userdata) {
      navigate("/login");
    }
  }, []);
  return (
    <div className="flex gap-5 bg-gray-100 relative w-full">
      <div className=" lg:gap-0 lg:gap-y-3 gap-4 mt-4 overflow-y-scroll h-[98vh] grid lg:grid-cols-3 xl:grid-cols-4 w-full">
        <Friends />
        <UserList />
        <Messege />
        <Group />
        <FriendRequest />
        <PracticeOne />
        <PracticeTwo />
        <PracticeThree />
      </div>
    </div>
  );
};

export default Home;
