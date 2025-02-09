import React, { useState } from "react";
import { AiTwotoneCloseCircle } from "react-icons/ai";

const Search = () => {
  const [groupPopup, setGroupPopup] = useState(false);
  // console.log(groupPopup);

  // Group Create
  const [groupCreate, setGroupCreate] = useState("");
  const [groupCreateError, setGroupCreateError] = useState(false);


  const createGroupBtn = () => {
    if (!groupCreate) {
      setGroupCreateError("Input Value is required");
    } else {
      console.log(groupCreate);
    }
  };
  return (
    <div className="bg-white min-w-[260px] w-96">
      <button
        onClick={() => setGroupPopup(!groupPopup)}
        className="px-5 py-3 text-white bg-green-500"
      >
        {groupPopup ? "Back" : "Create"}
      </button>
      {groupPopup ? (
        <div className="relative w-full text-white p-5 mt-5">
          <h2
            className="text-black mb-4 font-Ubuntu text-[25px]
          "
          >
            Create Group
          </h2>
          <h2
            className="text-black mb-1 font-Ubuntu
          "
          >
            Enter Your Group Name
          </h2>
          <input
            onChange={(e) => setGroupCreate(e.target.value)}
            type="text"
            placeholder="Create Group"
            className="bg-gray-200 placeholder:text-gray-600 w-full px-3 py-2 rounded font-Ubuntu border text-black"
          />
          {groupCreateError && (
            <p className="text-red-500 text-sm">{groupCreateError}</p>
          )}
          <button
            className="px-3 py-2 text-white bg-green-500 mt-2 font-Ubuntu rounded"
            onClick={createGroupBtn}
          >
            Create
          </button>
          {/* <button className="absolute top-0 right-0">
            <AiTwotoneCloseCircle
              className=" w-6 h-6 mr-4"
              onClick={() => setGroupPopup(false)}
            />
          </button> */}
        </div>
      ) : (
        <h2>Lorem ipsum dolor sit amet.</h2>
      )}
      <div></div>
    </div>
  );
};

export default Search;
