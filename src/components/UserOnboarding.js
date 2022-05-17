import React, { useEffect } from "react";
import { useApp } from "../context/app-context";

export const UserOnboarding = () => {
  const { name } = useApp();
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(name));
  }, [name]);
 
  return (
    <div className="h-full flex justify-center items-center  flex-col ">
      <h1 className="text-3xl font-bold text-white capitalize tracking-wider">
       Welcome {name}
      </h1>
    </div>
  );
};