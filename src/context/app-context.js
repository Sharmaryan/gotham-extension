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
      return { ...state, mainTask: action.payload.value, isMainTaskAdded: action.payload.isAdded 
      };
    default:
      return { ...state };
  }
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [{ isUser, name, time, greet, mainTask, isMainTaskAdded }, dispatch] = useReducer(
    appReducer,
    {
      isUser: false,
      name: "",
      time: { hour: "00", minute: "00" },
      greet: "",
      mainTask: "",
      isMainTaskAdded:false
    }
  );
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
        value={{ isUser, name, time, greet, mainTask, isMainTaskAdded, dispatch }}
      >
        {children}
      </AppContext.Provider>{" "}
    </>
  );
};

const useApp = () => useContext(AppContext);

export { useApp, AppProvider };
