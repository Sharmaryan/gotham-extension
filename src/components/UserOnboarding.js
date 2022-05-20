import axios from "axios";
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
    city,
    taskName
  } = useApp();
  let intervalRef = useRef();

  const [quote, setQuote] = useState();
  const [temperature, setTemperature] = useState('');
  const [icon, setIcon] = useState('');
  // const [mainValue, setMainValue] = useState('');

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
        payload: { value:taskName, isAdded: true },
      });
      localStorage.setItem("mainTask", JSON.stringify(e.target.value));
      localStorage.setItem("isMainTaskAdded", JSON.stringify(true));
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
      payload: { value: taskName, isAdded: false },
    });
  };
  const deleteTask = () => {
    localStorage.removeItem("mainTask");
    localStorage.removeItem("isMainTaskAdded");
    dispatch({
      type: "MAIN_TASK_DELETE",
      payload: { value: false, isAdded: false },
    });
  };

  useEffect(() => {
    setQuote(quoteDb[Math.floor(Math.random() * quoteDb.length)]);
  }, []);

  useEffect(() => {
    (async () => {
  const response = await axios.get(
    `http://api.weatherapi.com/v1/current.json?key=0592f3391efe4192a7893027221905&q=${city}&aqi=no`
  );
  setTemperature(response.data.current.feelslike_c);
  setIcon(response.data.current.condition.icon);
    })();
  },[city])

const mainInputHandler = (e) => {
// setMainValue(e.target.value);
dispatch({ type: "MAIN_TASK" , payload: e.target.value});
}

  return (
    <div className="h-full flex justify-center items-center  flex-col relative">
      <div className="absolute right-3 top-3 text-2xl font-extrabold text-white lowercase">
        <div>{temperature}°C <span className=" text-xl">{city}</span></div>
        <img src={icon} alt='weather' className="h3"/>
      </div>
      <h1 className="text-8xl font-black text-white capitalize tracking-wider">
        {time?.hour}:{time?.minute}
      </h1>
      <h2 className="text-4xl font-extrabold text-white capitalize tracking-wider mt-3">
        {greet}, {name}
      </h2>
      {isMainTaskAdded ?? (
        <p className="text-3xl font-black text-white capitalize mt-3">
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
            className={`text-3xl font-black text-white capitalize mt-3 ${
              isTaskCompleted ? `line-through` : `no-underline`
            }`}
          >
            {mainTask}
          </p>
          <i
            className="fa fa-edit text-2xl font-black font-light text-white capitalize ml-3 mt-3"
            onClick={editTask}
          ></i>
          <i
            className="fa fa-trash-o text-2xl font-light font-black text-white capitalize ml-3 mt-3"
            onClick={deleteTask}
          ></i>
        </label>
      ) : (
        <input
          type="text"
          className=" outline-none bg-transparent border-b-2 border-white-500 w-80 text-white text-2xl font-bold mt-1.5"
          onChange={mainInputHandler}
          value={taskName}
          onKeyPress={mainTaskHandler}
        />
      )}
     
      <p className="text-l font-black text-white capitalize mt-3">"{quote}"</p>
    </div>
  );
};
