import React, { useEffect, useRef, useState } from "react";
import { useApp } from "../context/app-context";
import { quoteDb } from "../db/quoteDb";
export const UserOnboarding = () => {
  const {
    name,
    dispatch,
    time,
    greet,
    mainTask,
    isMainTaskAdded,
    isTaskCompleted,
  } = useApp();
  let intervalRef = useRef();

  const [quote, setQuote] = useState();

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(name));
  }, [name]);

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

  const mainTaskHandler = (e) => {
    if (e.key === "Enter") {
      dispatch({
        type: "TASK_NAME",
        payload: { value: e.target.value, isAdded: true },
      });
    }
  };

  const changeHandler = (e) => {
    if (e.target.checked) {
      dispatch({
        type: "IS_TASK_COMPLETED",
        payload: true,
      });
    } else {
      dispatch({
        type: "IS_TASK_COMPLETED",
        payload: false,
      });
    }
  };

  const editTask = () => {
    dispatch({
      type: "MAIN_TASK_EDIT",
      payload: { value: mainTask, isAdded: false },
    });
  };
  const deleteTask = () => {
    dispatch({
      type: "MAIN_TASK_DELETE",
      payload: { value: false, isAdded: false },
    });
  };

useEffect(() => {
setQuote( quoteDb[Math.floor(Math.random() * quoteDb.length )]);

},[])

  return (
    <div className="h-full flex justify-center items-center  flex-col ">
      <h1 className="text-8xl font-black text-black capitalize tracking-wider">
        {time?.hour}:{time?.minute}
      </h1>
      <h2 className="text-4xl font-extrabold text-black capitalize tracking-wider mt-3">
        {greet}, {name}
      </h2>
      {isMainTaskAdded ?? (
        <p className="text-3xl font-black text-black capitalize mt-3">
          what is your main focus today?
        </p>
      )}

      {isMainTaskAdded ? (
        <label htmlFor="task" className="flex items-center ">
          <input
            type="checkbox"
            htmlFor="task"
            onChange={changeHandler}
            className="mx-3 "
          />{" "}
          <p
            className={`text-3xl font-black text-black capitalize mt-3 ${
              isTaskCompleted ? `line-through` : `no-underline`
            }`}
          >
            {mainTask}
          </p>
          <i
            class="fa fa-edit text-2xl font-black text-black capitalize ml-3 mt-3"
            onClick={editTask}
          ></i>
          <i
            class="fa fa-trash-o text-2xl font-black text-black capitalize ml-3 mt-3"
            onClick={deleteTask}
          ></i>
        </label>
      ) : (
        <input
          type="text"
          className=" outline-none bg-transparent border-b-2 border-white-500 w-80 text-black text-2xl font-bold mt-1.5"
          onKeyPress={mainTaskHandler}
        />
      )}
      <p className="text-l font-black text-black capitalize mt-3">{quote}</p>
      {/* <img src='../db/imageDb/image1' alt="" /> */}
    </div>
  );
};
