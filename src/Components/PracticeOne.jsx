import React, { useEffect, useState } from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector } from "react-redux";

const PracticeOne = () => {
  const data = useSelector((state) => state.userInfo.value);
  const db = getDatabase();
  const [practiceOne, setPracticeOne] = useState([]);
  const [friendRequest, setFriendRequest] = useState([]);
  useEffect(() => {
    const starCountRef = ref(db, "users/");
    onValue(starCountRef, (snapshot) => {
      const array = [];
      snapshot.forEach((practice) => {
        if (data.uid != practice.key) {
          array.push({ ...practice.val(), id: practice.key });
        }
      });
      setPracticeOne(array);
    });
  }, []);

  useEffect(() => {
    const starCountRef = ref(db, "request/");
    onValue(starCountRef, (snapshot) => {
      const array = [];
      snapshot.forEach((practice) => {
        array.push(practice.val().senderId + practice.val().receiverId);
      });
      setFriendRequest(array);
    });
  }, []);

  const handleRequest = (practice) => {
    set(push(ref(db, "request/")), {
      senderId: data.uid,
      senderName: data.displayName,
      senderEmail: data.email,
      receiverId: practice.id,
      receiverName: practice.name,
      receiverEmail: practice.email,
    });
  };
  return (
    <div>
      <div className="relative flex w-96 flex-col rounded-lg border border-slate-200 bg-white shadow-sm  ">
        <h1 className="ml-6 mt-4 font-bold pb-3">User List</h1>
        <nav className="flex min-w-[260px] h-[400px] overflow-y-scroll flex-col gap-1 p-1.5">
          {practiceOne.map((practice) => (
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
                      {practice.name}
                    </h6>
                    <p className="text-slate-500 text-sm">{practice.email}</p>
                  </div>
                </div>
                <div>
                  {friendRequest.includes(data.uid + practice.id) ||
                  (friendRequest.includes(practice.id + data.uid) ? (
                    <IconButton className="ml-1 !max-w-20 w-20">Del</IconButton>
                  ) : (
                    <IconButton
                      onClick={() => handleRequest(practice)}
                      className="ml-1 !max-w-20 w-20"
                    >
                      Add
                    </IconButton>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default PracticeOne;
