import React from "react";
import { useApp } from "../context/app-context";
import { UserName } from "../components/UserName";
import { UserCity } from "../components/UserCity";
export const WelcomeUser = () => {
  const { isUserNameAdded } = useApp();
  return (
    <div className="h-full flex justify-center items-center  flex-col ">
      {!isUserNameAdded && <UserName />}
      {isUserNameAdded && <UserCity />}
    </div>
  );
};
