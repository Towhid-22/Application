import React, { useState, useEffect } from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { FaRegPlusSquare, FaRegWindowClose } from "react-icons/fa";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

const Group = () => {
  const db = getDatabase();
  const auth = getAuth();
  const [groupPopup, setGroupPopup] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupNameError, setGroupNameError] = useState("");
  const [loading, setLoading] = useState(true);
  // console.log(groupName);

  const handleGroupName = (e) => {
    setGroupName(e.target.value);
    setGroupNameError("");
  };

  const createGroupBtn = () => {
    if (!groupName) {
      setGroupNameError("Group Name is Required");
    } else {
      set(push(ref(db, "groupList/")), {
        groupName: groupName,
        groupAdminName: auth.currentUser.displayName,
        groupAdminId: auth.currentUser.uid,
      }).then(() => {
        setGroupPopup(false);
      });
    }
  };

  const [groupList, setGroupList] = useState([]);
  useEffect(() => {
    const groupListRef = ref(db, "groupList/");
    onValue(groupListRef, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
        // console.log(item.val())
        array.push(item.val());
      });
      setLoading(false);
      setGroupList(array);
    });
  }, []);
  // console.log(groupList);

  return (
    <div>
      <div className="relative flex w-96 flex-col rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between">
          <h1 className="ml-6 mt-4 font-bold pb-3">Group List</h1>
          <button onClick={() => setGroupPopup(!groupPopup)}>
            {groupPopup ? (
              <FaRegWindowClose
                className="mr-9 w-8 h-8"
                title="Cancel Create Group"
              />
            ) : (
              <FaRegPlusSquare className="mr-9 w-8 h-8" title="Create Group" />
            )}
          </button>
        </div>
        {groupPopup ? (
          <div className="px-4 font-Ubuntu">
            <h2 className="text-[20px] mb-4">Create Group</h2>
            <h2 className="mb-2">Enter Your Group Name</h2>
            <input
              onChange={handleGroupName}
              type="text"
              className="w-full bg-gray-200 p-2 rounded"
              placeholder="Write Group Name"
            />
            {groupNameError && (
              <p className="text-red-500 text-sm">{groupNameError}</p>
            )}
            <button
              onClick={createGroupBtn}
              className="bg-black text-white p-2 rounded mt-2"
            >
              Create
            </button>
          </div>
        ) : null}
        <nav className="flex min-w-[240px] h-[400px] overflow-y-scroll flex-col gap-1 p-1.5">
          {groupList.length > 0 ? (
            groupList.map((item) => (
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
                        <span className="font-semibold">Admin:</span> {item.groupAdminName}
                      </p>
                    </div>
                  </div>
                  <IconButton className="ml-1">Add</IconButton>
                </div>
              </div>
            ))
          ) : loading ? (
            <div
              role="status"
              className="max-w-md p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded-sm shadow-sm animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5" />
                  <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
                </div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12" />
              </div>
              <div className="flex items-center justify-between pt-4">
                <div>
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5" />
                  <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
                </div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12" />
              </div>
              <div className="flex items-center justify-between pt-4">
                <div>
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5" />
                  <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
                </div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12" />
              </div>
              <div className="flex items-center justify-between pt-4">
                <div>
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5" />
                  <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
                </div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12" />
              </div>
              <div className="flex items-center justify-between pt-4">
                <div>
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5" />
                  <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
                </div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12" />
              </div>
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <h2 className="ml-4 text-red-500">Group is not available</h2>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Group;
