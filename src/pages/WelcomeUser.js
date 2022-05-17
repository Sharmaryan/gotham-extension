import React from "react";
import { useApp } from "../context/app-context";

export const WelcomeUser = () => {
  const { dispatch } = useApp();

  const continueHandler = () => {
    dispatch({ type: "CONTINUE", payload: true });
    localStorage.setItem("isUser", JSON.stringify(true));
  };

  return (
    <div className="h-full flex justify-center items-center  flex-col ">
      <h1 className="text-3xl font-bold text-white capitalize tracking-wider">
        hello what is your name?
      </h1>
      <input
        type="text"
        className=" outline-none bg-transparent border-b-2 border-white-500 w-64 text-white text-2xl font-bold mt-1.5"
        onChange={(e) => {
          dispatch({ type: "USER_NAME", payload: e.target.value });
        }}
      />
      <button
        className="border-2 px-2.5 mt-4 bg-white text-black text-xl capitalize border-none font-bold"
        onClick={continueHandler}
      >
        continue
      </button>
    </div>
  );
};
