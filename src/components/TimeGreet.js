import React, { useEffect, useRef } from "react";
import { useApp } from "../context/app-context";

export const TimeGreet = () => {
  const { time, greet, name, dispatch } = useApp();
  let intervalRef = useRef();
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      let today = new Date();
      let hour = today.getHours();

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

      let minute = today.getMinutes();
      if (minute < 10) minute = "0" + minute;
      dispatch({ type: "SET_TIME", payload: { hour, minute } });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [dispatch]);
  
  return (
    <div>
      <h1 className="text-8xl font-black text-white capitalize tracking-wider text-center">
        {time?.hour}:{time?.minute}
      </h1>
      <h2 className="text-4xl font-extrabold text-white capitalize tracking-wider mt-3">
        {greet}, {name}
      </h2>
    </div>
  );
};
