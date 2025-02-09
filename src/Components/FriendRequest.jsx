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
import { HiH2 } from "react-icons/hi2";
import { FaCheck } from "react-icons/fa";
import { RiCloseLine } from "react-icons/ri";

const FriendRequest = () => {
  const db = getDatabase();
  const userdata = useSelector((state) => state.userInfo.value);

  // Friend Request List
  const [friendRequest, setFriendRequest] = useState([]);
  useEffect(() => {
    const friendListRef = ref(db, "friendRequest/");
    onValue(friendListRef, (snapshot) => {
      const array = [];
      snapshot.forEach((item) => {
        if (userdata.uid == item.val().receiverId) {
          array.push({ ...item.val(), id: item.key });
        }
      });
      setFriendRequest(array);
    });
  }, []);

  const handleAcceptFriend = (item) => {
    set(push(ref(db, "friendList/")), {
      ...item,
    }).then(() => {
      remove(ref(db, "friendRequest/" + item.id));
    });
  };

  // Search Friend Request
  const [searchFriendRequestList, setSearchFriendRequestList] = useState([]);
  const handleSearch = (e) => {
    const searchFriendRequest = friendRequest.filter((search) =>
      search.senderName.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setSearchFriendRequestList(searchFriendRequest);
  };

  const handleCancelRequest =(item)=>{
    console.log(item)
     if (userdata.uid == item.receiverId) {
       remove(ref(db, "friendRequest/" + item.id));
     }
  }
  return (
    <div>
      <div className="relative flex w-96 flex-col rounded-lg border border-slate-200 bg-white shadow-sm  ">
        <h1 className="ml-6 mt-4 font-bold pb-3">Friends Request</h1>
        <div className="px-4">
          <input
            onChange={handleSearch}
            type="text"
            className="w-full h-10 p-3 font-Ubuntu placeholder:text-gray-500 bg-gray-200 rounded"
            placeholder="Search Friends"
          />
        </div>
        <nav className="flex min-w-[260px] h-[400px] overflow-y-scroll flex-col gap-1 p-1.5">
          {searchFriendRequestList.length > 0 ? (
            friendRequest.length > 0 ? (
              searchFriendRequestList.map((item) => (
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
                          {item.senderName}
                        </h6>
                        <p className="text-slate-500 text-sm">
                          {item.senderEmail}
                        </p>
                      </div>
                    </div>
                    <IconButton
                      onClick={() => handleAcceptFriend(item)}
                      className="ml-1 !max-w-20 w-20"
                    >
                      Accept
                    </IconButton>
                  </div>
                </div>
              ))
            ) : (
              <h2 className="ml-4 text-red-500">
                Friend Request is not available
              </h2>
            )
          ) : friendRequest.length > 0 ? (
            friendRequest.map((item) => (
              <div
                role="button"
                className="text-slate-800 flex w-full items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
              >
                <div
                // className="flex items-center justify-between w-full"
                >
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
                        {item.senderName}
                      </h6>
                      <p className="text-slate-500 text-sm">
                        {item.senderEmail}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 text-center">
                    <IconButton
                      onClick={() => handleAcceptFriend(item)}
                      className="ml-1 !max-w-20 w-20 bg-green-500"
                    >
                      <FaCheck className="w-5 h-5" />
                    </IconButton>
                    <IconButton 
                    onClick={()=> handleCancelRequest(item)}
                    className="ml-1 !max-w-20 w-20 bg-red-500">
                      <RiCloseLine className="w-8 h-8 font-extrabold" />
                    </IconButton>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h2 className="ml-4 text-red-500">
              Friend Request is not available
            </h2>
          )}
        </nav>
      </div>
    </div>
  );
};

export default FriendRequest;
