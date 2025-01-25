import React from "react";
import { Button, IconButton } from "@material-tailwind/react";

const PracticeThree = () => {
  return (
    <div>
      <div className="relative flex w-96 flex-col rounded-lg border border-slate-200 bg-white shadow-sm  ">
        <h1 className="ml-6 mt-4 font-bold pb-3">Friend List</h1>
        <nav className="flex min-w-[260px] h-[400px] overflow-y-scroll flex-col gap-1 p-1.5">
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
                  <h6 className="text-slate-800 font-medium">David Miller</h6>
                  <p className="text-slate-500 text-sm">
                    Lorem ipsum dolor sit amet consectetur.
                  </p>
                </div>
              </div>
              <IconButton className="ml-1 !max-w-20 w-20">Add</IconButton>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default PracticeThree;
