import React, { useEffect, useState } from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector } from "react-redux";
import { ToastContainer, toast, Bounce } from "react-toastify";

const UserList = () => {
  const userdata = useSelector((state) => state.userInfo.value);
  const db = getDatabase();
  const [userList, setUserList] = useState([]);
  const [friendrequestList, setFriendrequestList] = useState([]);
  useEffect(() => {
    const userListRef = ref(db, "users/");
    onValue(userListRef, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
        if (userdata.uid != item.key) {
          // take id
          array.push({ ...item.val(), id: item.key });
        }
      });
      setUserList(array);
    });
  }, []);
  useEffect(() => {
    const userListRef = ref(db, "friendRequest/");
    onValue(userListRef, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
        array.push(item.val().senderId + item.val().receiverId);
      });
      setFriendrequestList(array);
    });
  }, []);

  const handleFriendRequest = (item) => {
    set(push(ref(db, "friendRequest/")), {
      senderId: userdata.uid,
      senderName: userdata.displayName,
      senderEmail: userdata.email,
      receiverId: item.id,
      receiverName: item.name,
      receiverEmail: item.email,
    }).then(() => {
      toast.success("Friend Request Sent", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    });
  };

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <div className="relative flex w-96 flex-col rounded-lg border border-slate-200 bg-white shadow-sm">
        <h1 className="ml-6 mt-4 font-bold pb-3">User List</h1>
        <nav className="flex min-w-[240px] h-[400px] overflow-y-scroll flex-col gap-1 p-1.5">
          {userList.map((item) => (
            <div
              role="button"
              className="text-slate-800 flex w-full items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
            >
              <div className="flex items-center w-full justify-between">
                <div className="flex">
                  <div className="mr-4 grid place-items-center">
                    <img
                      alt="candice"
                      src="https://docs.material-tailwind.com/img/face-1.jpg"
                      className="relative inline-block h-12 w-12 !rounded-full  object-cover object-center"
                    />
                  </div>
                  <div>
                    <h6 className="text-slate-800 font-medium">{item.name}</h6>
                    <p className="text-slate-500 text-sm">{item.email}</p>
                  </div>
                </div>
                <div className="ml-auto">
                  {friendrequestList.includes(userdata.uid + item.id) ||
                    (friendrequestList.includes(item.id + userdata.uid) ? (
                      <IconButton>R</IconButton>
                    ) : (
                      <IconButton onClick={() => handleFriendRequest(item)}>
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

export default UserList;
