import { useContext, createContext, useReducer, useEffect } from "react";

const appReducer = (state, action) => {
  switch (action.type) {
    case "USER_NAME":
      return { ...state, name: action.payload };
    case "CONTINUE":
      return { ...state, isUser: action.payload };
    case "PERSISTENT_DATA":
      return { isUser: action.payload.isUser, name: action.payload.user };
    case "SET_TIME":
      return {
        ...state,
        time: {
          ...state.time,
          hour: action.payload.hour,
          minute: action.payload.minute,
        },
      };
    case "SET_GREET":
      return { ...state, greet: action.payload };
    case "TASK_NAME":
      return {
        ...state,
        mainTask: action.payload.value,
        isMainTaskAdded: action.payload.isAdded,
      };
    case "MAIN_TASK_DELETE":
      return {
        ...state,
        mainTask: "",
        isMainTaskAdded: action.payload.isAdded,
        isTaskCompleted: action.payload.value,
      };
    case "MAIN_TASK_EDIT":
      return {
        ...state,
        mainTask: action.payload.value,
        isMainTaskAdded: action.payload.isAdded,
      };
    case "IS_TASK_COMPLETED":
      return {
        ...state,
        isTaskCompleted: action.payload,
      };

    default:
      return { ...state };
  }
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [
    { isUser, name, time, greet, mainTask, isMainTaskAdded, isTaskCompleted },
    dispatch,
  ] = useReducer(appReducer, {
    isUser: false,
    name: "",
    time: { hour: "00", minute: "00" },
    greet: "",
    mainTask: "",
    isMainTaskAdded: false,
    isTaskCompleted: false,
  });
  useEffect(() => {
    if (localStorage.getItem("isUser") === null) {
      return;
    } else {
      const data = JSON.parse(localStorage.getItem("isUser") ?? "");
      const user = JSON.parse(localStorage.getItem("user") ?? "");
      dispatch({ type: "PERSISTENT_DATA", payload: { isUser: data, user } });
    }
  }, []);

  return (
    <>
      {" "}
      <AppContext.Provider
        value={{
          isUser,
          name,
          time,
          greet,
          mainTask,
          isMainTaskAdded,
          isTaskCompleted,
          dispatch,
        }}
      >
        {children}
      </AppContext.Provider>{" "}
    </>
  );
};

const useApp = () => useContext(AppContext);

export { useApp, AppProvider };
