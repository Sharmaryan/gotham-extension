import React from 'react'
import { useApp } from '../context/app-context';
import { nameHandler, nextHandler } from '../services/nameCity';

export const UserName = () => {
const {dispatch, name} = useApp();
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold text-white capitalize tracking-wider">
        hello what is your name?
      </h1>
      <input
        type="text"
        className=" outline-none bg-transparent border-b-2 border-white-500 w-64 text-white text-2xl font-bold mt-1.5"
        onChange={(e) => nameHandler(e, dispatch)}
      />
      <button
        className="border-2 px-2.5 mt-4 bg-white text-black text-xl capitalize border-none font-bold"
        onClick={(e) => nextHandler(name, dispatch)}
      >
        next
      </button>
    </div>
  );
}
