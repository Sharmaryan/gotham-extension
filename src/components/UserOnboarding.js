import React, { useEffect} from "react";
import { useApp } from "../context/app-context";
import {
  Weather,
  TimeGreet,
  MainTask,
  EditDeleteMainTask,
  Quote,
  MainFocusToday
} from "../components/index";

export const UserOnboarding = () => {
  const {
    name,
    isMainTaskAdded,
  } = useApp();

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(name));
  }, [name]);

  return (
    <div className="h-full flex justify-center items-center  flex-col relative">
      <Weather />
      <TimeGreet />
      {isMainTaskAdded ?? (
       <MainFocusToday/>
      )}
      {isMainTaskAdded ? <EditDeleteMainTask /> : <MainTask />}
     <Quote/>
    </div>
  );
};
