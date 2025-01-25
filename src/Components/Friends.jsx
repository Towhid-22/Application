import React, { useState } from "react";
import { Button, IconButton, useSelect } from "@material-tailwind/react";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Friends = () => {
  const userdata = useSelector((state) => state.userInfo.value);
  const db = getDatabase();
  const [friendList, setFriendList] = useState([]);
  useEffect(() => {
    const starCountRef = ref(db, "friendList/");
    onValue(starCountRef, (snapshot) => {
      const array = [];
      snapshot.forEach((friend) => {
        array.push({ ...friend.val(), id: friend.key });
      });
      setFriendList(array);
    });
  }, []);
  return (
    <div>
      <div className="relative flex w-96 flex-col rounded-lg border border-slate-200 bg-white shadow-sm  ">
        <h1 className="ml-6 mt-4 font-bold pb-3">Friend List</h1>
        <nav className="flex min-w-[240px] h-[400px] overflow-y-scroll flex-col gap-1 p-1.5">
          {friendList.map((friends) => (
            <div
              role="button"
              className="text-slate-800 flex w-full items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex">
                  <div className="mr-4 grid place-items-center">
                    <img
                      alt="candice"
                      src="https://docs.material-tailwind.com/img/face-1.jpg"
                      className="relative inline-block h-12 w-12 !rounded-full  object-cover object-center"
                    />
                  </div>
                  <div>
                    <h6 className="text-slate-800 font-medium">{friends.senderName}</h6>
                    <p className="text-slate-500 text-sm">
                      {friends.senderEmail}
                    </p>
                  </div>
                </div>
                <IconButton className="ml-1">Add</IconButton>
              </div>
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Friends;
