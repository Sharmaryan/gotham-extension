import React, { useEffect, useRef } from "react";
import { useApp } from "../context/app-context";

export const UserOnboarding = () => {
  const { name, dispatch, time, greet } = useApp();
  let intervalRef = useRef();
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(name));
  }, [name]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      let today = new Date();
      let [hour, minute] = today.toLocaleTimeString().split(":");

      if (hour >= 12) {
        dispatch({ type: "SET_GREET", payload: "Good Afternoon" });
        if (hour > 16) {
          dispatch({ type: "SET_GREET", payload: "Good Evening" });
        }
        if (hour < 10) {
          hour = "0" + hour;
        }
      }

      if (hour < 12) {
        dispatch({ type: "SET_GREET", payload: "Good Morning" });
      }

      if (minute < 10) minute = "0" + minute;
      dispatch({ type: "SET_TIME", payload: { hour, minute } });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [dispatch]);

  return (
    <div className="h-full flex justify-center items-center  flex-col ">
      <h1 className="text-8xl font-bold text-black capitalize tracking-wider">
        {time?.hour}:{time?.minute}
      </h1>
      <h2 className="text-4xl font-bold text-black capitalize tracking-wider mt-3">
        {greet}, {name}
      </h2>
    </div>
  );
};
