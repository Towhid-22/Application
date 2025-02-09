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
import { CgUnblock } from "react-icons/cg";

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

  const handleUnblock = (item) => {
    if (userdata.uid == item.blockGiverId) {
      set(push(ref(db, "friendList/")), {
        senderId: item.blockGiverId,
        senderName: item.blockGiverName,
        senderEmail: item.blockGiverEmail,
        receiverId: item.blockReceiverId,
        receiverName: item.blockReceiverName,
        receiverEmail: item.blockReceiverEmail,
      }).then(() => {
        remove(ref(db, "blockList/" + item.id));
      });
    }
  };

  // Block search
  const [searchBlockList, setSearchBlockList] = useState([]);
  const handleSearch = (e) => {
    const searchBlockList = blockList.filter((search) =>
      search.blockReceiverName
        .toLowerCase()
        .includes(e.target.value.toLowerCase())
    );
    setSearchBlockList(searchBlockList);
  };
  return (
    <div>
      <div className="relative flex w-96 flex-col rounded-lg border border-slate-200 bg-white shadow-sm">
        <h1 className="ml-6 mt-4 font-bold pb-3">Block List</h1>
        <div className="px-4">
          <input
            onChange={handleSearch}
            type="text"
            className="w-full h-10 p-3 font-Ubuntu placeholder:text-gray-500 bg-gray-200 rounded"
            placeholder="Search Friends"
          />
        </div>
        <nav className="flex min-w-[240px] h-[400px] overflow-y-scroll flex-col gap-1 p-1.5">
          {searchBlockList.length > 0 ? (
            blockList.length > 0 ? (
              searchBlockList.map((item) => (
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
                      onClick={() => handleUnblock(item)}
                      className="ml-1 w-[90px]"
                    >
                      Unblock
                    </IconButton>
                  </div>
                </div>
              ))
            ) : (
              <p>Lorem ipsum dolor sit amet.</p>
              // <h2 className="ml-4 text-red-500">Block is not available</h2>
            )
          ) : blockList.length > 0 ? (
            blockList.map((item) => (
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
                    title="Unblock"
                    onClick={() => handleUnblock(item)}
                    className="ml-1 w-[90px]"
                  >
                    <CgUnblock className="w-7 h-7" />
                  </IconButton>
                </div>
              </div>
            ))
          ) : (
            <h2 className="ml-4 text-red-500">Block is not available</h2>
          )}
        </nav>
      </div>
    </div>
  );
};

export default BlockList;
// class 63 = unblock, search with filter(), create a group and popup
