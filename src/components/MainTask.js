import React from "react";
import { useApp } from "../context/app-context";
import { mainInputHandler, mainTaskHandler } from "../services/mainTask";
export const MainTask = () => {
  const { dispatch, taskName } = useApp();
  return (
    <input
      type="text"
      className=" outline-none bg-transparent border-b-2 border-white-500 w-80 text-white text-2xl font-bold mt-1.5"
      onChange={(e) => mainInputHandler(e, dispatch)}
      value={taskName}
      onKeyPress={(e) => mainTaskHandler(e, dispatch, taskName)}
    />
  );
};
