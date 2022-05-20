import { useContext, createContext, useReducer, useEffect } from "react";
import { appReducer } from "../reducer/appReducer";

const AppContext = createContext();
const AppProvider = ({ children }) => {
  const [
    {
      isUser,
      name,
      time,
      greet,
      mainTask,
      isMainTaskAdded,
      isTaskCompleted,
      city,
      isUserNameAdded,
      taskName,
      weather,
      quote
    },
    dispatch,
  ] = useReducer(appReducer, {
    isUser: false,
    name: "",
    time: { hour: "00", minute: "00" },
    greet: "",
    mainTask: "",
    isMainTaskAdded: false,
    isTaskCompleted: false,
    city: "",
    isUserNameAdded: false,
    taskName: "",
    weather: { temperature:'', icon:''},
    quote:''
  });

  useEffect(() => {
    if (localStorage.getItem("isUser") === null) {
      return;
    } else {
      const data = JSON.parse(localStorage.getItem("isUser"));
      const user = JSON.parse(localStorage.getItem("user"));
      const mainTaskName = JSON.parse(localStorage.getItem("mainTask"));
      const isTaskAddedIn = JSON.parse(localStorage.getItem("isMainTaskAdded"));
      const city = JSON.parse(localStorage.getItem("city"));
      dispatch({
        type: "PERSISTENT_DATA",
        payload: {
          isUser: data,
          user, 
          mainTaskName,
          isMainTaskAdded: isTaskAddedIn,
          city
        },
      });
    }
  }, []);

  return (
    <>
      <AppContext.Provider
        value={{
          isUser,
          name,
          time,
          greet,
          mainTask,
          isMainTaskAdded,
          isTaskCompleted,
          city,
          isUserNameAdded,
          taskName,
          weather,
          quote,
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
