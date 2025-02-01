import React, { useEffect, useState } from "react";
import { Button, IconButton } from "@material-tailwind/react";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import { useSelector } from "react-redux";

const BlockList = () => {
  const userdata = useSelector((state) => state.userInfo.value);
  const db = getDatabase();
  const [blockList, setBlockList] = useState([]);
  useEffect(() => {
    const blockListRef = ref(db, "blockList/");
    onValue(blockListRef, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
        if (userdata.uid == item.val().blockGiverId) {
          array.push({ ...item.val(), id: item.key });
        }
      });
      setBlockList(array);
    });
  }, []);
  // const handleMouseMove = (e) => {
  //   console.log("move")
  // }

  // const handleUnblock = (item) => {
  //   remove(ref(db, "blockList/" + item.id)).then(() => {});
  // };
  return (
    <div>
      <div className="relative flex w-96 flex-col rounded-lg border border-slate-200 bg-white shadow-sm">
        <h1 className="ml-6 mt-4 font-bold pb-3">Block List</h1>
        <nav className="flex min-w-[240px] h-[400px] overflow-y-scroll flex-col gap-1 p-1.5">
          {blockList.map((item) => (
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
                      {item.blockReceiverName}
                    </h6>
                    <p className="text-slate-500 text-sm">
                      {item.blockReceiverEmail}
                    </p>
                  </div>
                </div>
                <IconButton
                  // onClick={() => handleUnblock(item)}
                  className="ml-1"
                >
                  Unblock
                </IconButton>
              </div>
            </div>
          ))}
          {/* <button onMouseOut={handleMouseMove} className="bg-green-500 p-3 w-[100px] rounded text-white font-bold text-2xl">Button</button> */}
        </nav>
      </div>
    </div>
  );
};

export default BlockList;
