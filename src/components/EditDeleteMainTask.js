import React from "react";
import { useApp } from "../context/app-context";
import { deleteTask, editTask, changeHandler } from "../services/mainTask";
export const EditDeleteMainTask = () => {
  const { isTaskCompleted, dispatch, mainTask, taskName } = useApp();
  return (
    <label htmlFor="task" className="flex items-center ">
      <input
        type="checkbox"
        htmlFor="task"
        onChange={(e) => changeHandler(e, dispatch)}
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
        onClick={() => editTask(dispatch, taskName)}
      ></i>
      <i
        className="fa fa-trash-o text-2xl font-light font-black text-white capitalize ml-3 mt-3"
        onClick={() => deleteTask(dispatch)}
      ></i>
    </label>
  );
};
