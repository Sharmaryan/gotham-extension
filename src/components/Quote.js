import React,{useEffect} from "react";
import { useApp  } from "../context/app-context";
import { quoteDb } from "../db/quoteDb";
export const Quote = () => {
  const { quote, dispatch } = useApp();
   useEffect(() => {
     dispatch({
       type: "SET_QUOTE",
       payload: quoteDb[Math.floor(Math.random() * quoteDb.length)],
     });
   }, [dispatch]);
  return (
    <p className="text-l font-black text-white capitalize mt-3">"{quote}"</p>
  );
};
