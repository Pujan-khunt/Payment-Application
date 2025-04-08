import React from "react";
import Logo from "../Assets/images/Payap2.png";

function Navbar({ firstName, avatarUrl }) {
  return (
    <div className="w-full h-16 bg-emerald-500 flex items-center px-4 shadow-md">
      <div className='flex items-center flex-1'>
        <img src={Logo} className='w-16 h-auto' />
        <div className="text-3xl drop-shadow-2xl font-extrabold bg-gradient-to-r from-teal-200  to-green-200 bg-clip-text text-transparent ml-2">
          PayaP
        </div>
      </div>
      <div className='flex gap-x-4 items-center'>
        <p className='text-lg'>Hello, {firstName}</p>
        <img src={avatarUrl} className="w-10 h-10 rounded-full"/>
      </div>
    </div>
  );
}

export default Navbar;
