import React from "react";
import Sidebar from "../Components/Sidebar";
import Friends from "../Components/Friends";
import UserList from "../Components/UserList";
import Messege from "../Components/Messege";

const Home = () => {
  return (
    <div className="flex gap-5 bg-gray-100">
      <div>
        <Sidebar />
      </div>
      <div className="lg:flex xl:flex 2xl:flex md:flex-row gap-4 pt-4">
        <Friends />
        <UserList />
        <Messege />
        {/* <Group/> */}
      </div>
    </div>
  );
};

export default Home;
