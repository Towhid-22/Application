import React from "react";
import Sidebar from "../Components/Sidebar";
import Friends from "../Components/Friends";
import UserList from "../Components/UserList";
import Messege from "../Components/Messege";
import Group from "../Components/Group";

const Home = () => {
  return (
    <div className="flex gap-5 bg-gray-100 relative w-full">
      <div>
        <Sidebar />
      </div>
      <div className=" lg:gap-0 lg:gap-y-3 gap-4 mt-4 overflow-y-scroll h-[98vh] grid lg:grid-cols-3 xl:grid-cols-4 w-full">
        <Friends />
        <UserList />
        <Messege />
        <Group />
      </div>
    </div>
  );
};

export default Home;
