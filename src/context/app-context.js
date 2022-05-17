import { useContext, createContext, useReducer, useEffect } from "react";

const appReducer = (state, action) => {
  switch (action.type) {
    case "USER_NAME":
      return { ...state, name: action.payload };
    case "CONTINUE":
      return { ...state, isUser: action.payload };
    case "PERSISTENT_DATA":
      console.log("persist", action);
      return { isUser: action.payload.isUser, name: action.payload.user };
    default:
      return { ...state };
  }
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [{ isUser, name }, dispatch] = useReducer(appReducer, {
    isUser: false,
    name: "",
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
      <AppContext.Provider value={{ isUser, name, dispatch }}>
        {children}
      </AppContext.Provider>{" "}
    </>
  );
};

const useApp = () => useContext(AppContext);

export { useApp, AppProvider };
