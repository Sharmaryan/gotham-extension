const mainTaskHandler = (e, dispatch, taskName) => {
  if (e.key === "Enter") {
    dispatch({
      type: "TASK_NAME",
      payload: { value: taskName, isAdded: true },
    });
    localStorage.setItem("mainTask", JSON.stringify(e.target.value));
    localStorage.setItem("isMainTaskAdded", JSON.stringify(true));
  }
};
const changeHandler = (e, dispatch) => {
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

const editTask = (dispatch, taskName) => {
  dispatch({
    type: "MAIN_TASK_EDIT",
    payload: { value: taskName, isAdded: false },
  });
};
const deleteTask = (dispatch) => {
  localStorage.removeItem("mainTask");
  localStorage.removeItem("isMainTaskAdded");
  dispatch({
    type: "MAIN_TASK_DELETE",
    payload: { value: false, isAdded: false },
  });
};
const mainInputHandler = (e, dispatch) => {
  dispatch({ type: "MAIN_TASK", payload: e.target.value });
};

export {deleteTask, mainTaskHandler, editTask, changeHandler, mainInputHandler}