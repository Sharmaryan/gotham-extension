import React from 'react'
import { cityHandler, continueHandler } from '../services/nameCity';
import { useApp } from '../context/app-context';
export const UserCity = () => {
    const {dispatch, city} = useApp();
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold text-white capitalize tracking-wider">
        enter city
      </h1>
      <input
        type="text"
        className=" outline-none bg-transparent border-b-2 border-white-500 w-64 text-white text-2xl font-bold mt-1.5"
        onChange={(e) => cityHandler(e, dispatch)}
      />
      <button
        className="border-2 px-2.5 mt-4 bg-white text-black text-xl capitalize border-none font-bold"
        onClick={() => continueHandler(city, dispatch)}
      >
        continue
      </button>
    </div>
  );
}
