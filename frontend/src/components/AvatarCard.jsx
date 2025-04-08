import React from "react";
import profilePhoto from "../Assets/images/profile.jpg";

function AvatarCard({ name, phoneNumber }) {
  return (
    <div className='border border-gray-300 p-2 bg-gray-100 shadow-lg rounded-lg flex'>
      <img src={profilePhoto} className='rounded-full w-24 h-24 object-cover' />
      <div className='grid grid-cols-1 grid-rows-2 w-full flex-1'>
        <div className='text-2xl font-medium row-span-1 self-end text-center'>{name}</div>
        <div className='row-span-1 self-start text-center'>{phoneNumber}</div>
      </div>
    </div>
  );
}

export default AvatarCard;
