import React,{useEffect} from "react";
import axios from "axios";
import { useApp } from "../context/app-context";
export const Weather = () => {
  const {
    weather,city, dispatch
  } = useApp();
    useEffect(() => {
      (async () => {
        const response = await axios.get(
          `http://api.weatherapi.com/v1/current.json?key=0592f3391efe4192a7893027221905&q=${city}&aqi=no`
        );
        dispatch({
          type: "SET_WEATHER",
          payload: {
            temp: response.data.current.feelslike_c,
            icon: response.data.current.condition.icon,
          },
        });
      })();
    }, [city, dispatch]);
  return (
    <div className="absolute right-3 top-3 text-2xl font-extrabold text-white lowercase">
      <div>
        {weather?.temperature}° <span className=" text-xl capitalize">{city}</span>
      </div>
      <img src={weather?.icon} alt="weather" className="h3" />
    </div>
  );
};
