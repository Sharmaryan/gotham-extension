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
          `http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${city}&aqi=no`
        );
        dispatch({
          type: "SET_WEATHER",
          payload: {
            temp: response.data.current.feelslike_c,
            
          },
        });
      })();
    }, [city, dispatch]);
  return (
    <div className="absolute right-3 top-3 text-2xl font-extrabold text-white lowercase">
      <div>
        {weather?.temperature}° <span className=" text-xl capitalize">{city}</span>
      </div>
     
    </div>
  );
};
