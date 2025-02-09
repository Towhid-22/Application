import { IconButton } from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
// import { Skeleton } from "primereact/skeleton";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector } from "react-redux";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

const MyGroupList = () => {
  const db = getDatabase();
  const auth = getAuth();
  const data = useSelector((state) => state.userInfo.value);
  const [myGroupList, setMyGroupList] = useState([]);
  useEffect(() => {
    const groupListRef = ref(db, "groupList/");
    onValue(groupListRef, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
        if (data.uid == item.val().groupAdminId) {
          array.push(item.val());
        }
      });
      setMyGroupList(array);
    });
  }, []);
  return (
    <div>
      <div className="relative flex w-96 flex-col rounded-lg border border-slate-200 bg-white shadow-sm ">
        <h1 className="ml-6 mt-4 font-bold pb-3">My Group List</h1>
        <nav className="flex min-w-[240px] h-[400px] overflow-y-scroll flex-col gap-1 p-1.5">
          {myGroupList.length > 0 ? (
            myGroupList.map((item) => (
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
                      <h6 className="text-slate-800 font-medium">
                        {item.groupName}
                      </h6>
                      <p className="text-slate-500 text-sm">
                        <span className="font-semibold">Admin: </span>
                         {item.groupAdminName}
                      </p>
                    </div>
                  </div>
                  <IconButton className="ml-1">Add</IconButton>
                </div>
              </div>
            ))
          ) : (
            <h2 className="ml-4 text-red-500">Group is not available</h2>
          )}
        </nav>
      </div>
    </div>
  );
};

export default MyGroupList;
