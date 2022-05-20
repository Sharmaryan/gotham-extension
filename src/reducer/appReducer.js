export const appReducer = (state, action) => {
  switch (action.type) {
    case "USER_NAME":
      return { ...state, name: action.payload };
    case "USER_CITY":
      return { ...state, city: action.payload };
    case "NEXT":
      return { ...state, isUserNameAdded: action.payload };
    case "CONTINUE":
      return { ...state, isUser: action.payload };
    case "PERSISTENT_DATA":
      return {
        isUser: action.payload.isUser,
        name: action.payload.user,
        mainTask: action.payload.mainTaskName,
        isMainTaskAdded: action.payload.isMainTaskAdded,
        city: action.payload.city
      };
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
        taskName: "",
      };
    case "MAIN_TASK_EDIT":
      return {
        ...state,
        mainTask: action.payload.value,
        isMainTaskAdded: action.payload.isAdded,
      };
    case "MAIN_TASK":
      return { ...state, taskName: action.payload };
    case "IS_TASK_COMPLETED":
      return {
        ...state,
        isTaskCompleted: action.payload,
      };
    case "SET_WEATHER":
      return {
        ...state,
        weather: {
          ...state.weather,
          temperature: action.payload.temp,
          icon: action.payload.icon,
        },
      };
    case "SET_QUOTE":
      return {
        ...state,quote: action.payload
      };
    default:
      return { ...state };
  }
};
