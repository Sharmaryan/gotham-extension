const continueHandler = (city, dispatch) => {
  if (city.length > 0) dispatch({ type: "CONTINUE", payload: true });
  localStorage.setItem("isUser", JSON.stringify(true));
  localStorage.setItem('city', JSON.stringify(city));
};

const nextHandler = (name, dispatch) => {
  if (name?.length > 0) dispatch({ type: "NEXT", payload: true });
};

const nameHandler = (e, dispatch) => {
  dispatch({ type: "USER_NAME", payload: e.target.value });
};
const cityHandler = (e, dispatch) => {
  dispatch({ type: "USER_CITY", payload: e.target.value });
};

export {continueHandler, nextHandler, nameHandler, cityHandler}