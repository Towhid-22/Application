import React, { useState } from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { useEffect } from "react";
import {
  getDatabase,
  ref,
  set,
  push,
  remove,
  onValue,
} from "firebase/database";
import { useSelector } from "react-redux";
import { LuPaperclip, LuSend, LuUsers } from "react-icons/lu";
import Profile from "../../src/assets/profile.png";
import { RiDeleteBin6Line } from "react-icons/ri";
import { PiVideoCamera } from "react-icons/pi";
import { BsTelephone } from "react-icons/bs";
import { GoDotFill, GoDownload } from "react-icons/go";
import Friends from "./Friends";

const Messege = () => {
  const db = getDatabase();
  const [msg, setMsg] = useState("");
  const [msgList, setMsgList] = useState([]);
  const data = useSelector((state) => state.userInfo.value);
  const msgInfo = useSelector((state) => state.msgInfo.value);
  // console.log(msgInfo);

  const handleMsg = (e) => {
    setMsg(e.target.value);
  };
  const handleSendMsg = () => {
    if (msg) {
      set(push(ref(db, "msglist/")), {
        msgSenderId: data.uid,
        msgSenderName: data.displayName,
        msgReceiverId: msgInfo.id,
        msgReceiverName: msgInfo.name,
        msg: msg,
        date: `${new Date().getFullYear()} - ${
          new Date().getMonth() + 1
        } - ${new Date().getDate()} - ${
          new Date().getHours() + 1
        } - ${new Date().getMinutes()}`,
      }).then(() => {
        setMsg("");
      });
    } else {
      alert("Please Enter Message");
    }
    // console.log(msg);
  };
  useEffect(() => {
    const msgListRef = ref(db, "msglist/");
    onValue(msgListRef, (snapshot) => {
      const array = [];
      snapshot.forEach((item) => {
        if (
          (data.uid == item.val().msgSenderId &&
            msgInfo.id == item.val().msgReceiverId) ||
          (data.uid == item.val().msgReceiverId &&
            msgInfo.id == item.val().msgSenderId)
        ) {
          array.push({ ...item.val(), id: item.key });
        }
      });
      setMsgList(array);
    });
  }, []);
  console.log(msgList);
  return (
    <div className="space-y-6 my-6 flex">
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Chat List */}
        <div className="lg:col-span-1 ">
          <div className="rounded-xl border h-[calc(100vh-55px)] border-default-200  bg-white dark:bg-default-50 lg:min-w-96 overflow-y-scroll ">
            <Friends className="h-full shadow-none" msgBtn={true} />
          </div>
        </div>
        {/* Chat Conversation */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-default-200 bg-white dark:bg-default-50 w-full overflow-hidden">
            <div className="py-3 px-6 border-b border-default-200">
              <div className="flex flex-wrap items-center justify-between gap-3 py-1.5">
                <div className="sm:w-7/12">
                  <div className="flex items-center gap-2">
                    <img
                      src={Profile}
                      className="me-2 rounded-full h-9"
                      alt="Brandon Smith"
                    />
                    <div>
                      <h5 className="text-base font-medium text-default-700">
                        {msgInfo ? msgInfo.name : <h1>Select an user</h1>}
                      </h5>
                      <p className="mt-1.5 text-default-400 text-xs flex items-center">
                        <GoDotFill className="ti ti-circle-filled text-red-400 me-1" />{" "}
                        Offline
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-auto">
                  <a href="javascript: void(0);" className="p-1.5 inline-block">
                    <BsTelephone className=" text-xl text-default-900" />
                  </a>
                  <a href="javascript: void(0);" className="p-1.5 inline-block">
                    <PiVideoCamera className="text-xl text-default-900" />
                  </a>
                  <a href="javascript: void(0);" className="p-1.5 inline-block">
                    <LuUsers className="text-xl text-default-900" />
                  </a>
                  <a href="javascript: void(0);" className="p-1.5 inline-block">
                    <RiDeleteBin6Line className="text-xl text-default-900" />
                  </a>
                </div>
              </div>
            </div>
            <div className="p-6 h-[calc(100vh-230px)] overflow-y-auto">
              <div className="space-y-4">
                {/* Chat Left */}
                <div className="flex items-start text-start gap-3 group">
                  <div className="text-center">
                    <img src={Profile} className="rounded-md h-8" />
                    <p className="text-xs pt-0.5">10:00</p>
                  </div>
                  <div className="max-w-3/4 bg-gray-300 p-3 rounded">
                    <p className="text-xs font-bold relative text-default-800">
                      John K
                    </p>
                    <p className="pt-1">Hello!</p>
                  </div>
                </div>
                {/* Chat Right */}
                <div className="flex flex-row-reverse items-start text-end gap-3 group">
                  <div className="text-center">
                    <img src={Profile} className="rounded-md h-8" />
                    <p className="text-xs pt-0.5">10:01</p>
                  </div>
                  <div className="max-w-3/4 bg-primary bg-[#D9FDD3] p-3 rounded">
                    <p className="block text-xs font-bold text-black relative">
                      Diane B
                    </p>
                    <p className="pt-1 text-black">
                      Hi, How are you? What about our next meeting?
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white border-t border-default-200 dark:bg-default-50 p-6">
              <div name="chat-form" className="flex items-center gap-2">
                <input
                  onChange={handleMsg}
                  type="text"
                  value={msg}
                  className="w-full border-none bg-default-100 text-default-900 rounded placeholder:text-default-600 p-2"
                  placeholder="Enter your text"
                  required=""
                />
                <div className="w-auto flex gap-1">
                  {/* <a
                    href="#"
                    className="px-3 py-2 rounded bg-default-200 text-default-800 hover:bg-default-800/20"
                  >
                    <LuPaperclip />
                  </a> */}
                  <button
                    onClick={handleSendMsg}
                    className="px-3 py-2 inline-flex items-center justify-center gap-2 bg-teal-500 text-white rounded transition-all duration-300 hover:bg-teal-600"
                  >
                    Send <LuSend />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messege;
