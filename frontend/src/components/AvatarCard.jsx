import React from "react";

function AvatarCard({ username, fullName, email }) {
  const avatarUrl = `https://api.dicebear.com/9.x/lorelei/svg?backgroundType=gradientLinear&seed=${username}`;

  return (
    <div className='border border-gray-300 p-2 bg-gray-100 shadow-lg rounded-lg flex'>
      <img src={avatarUrl} className='rounded-full w-24 h-24 object-cover' />
      <div className='grid grid-cols-1 grid-rows-2 w-full flex-1'>
        <div className='text-2xl font-medium row-span-1 self-end text-center'>{fullName}</div>
        <div className='row-span-1 self-start text-center'>{email}</div>
      </div>
    </div>
  );
}

export default AvatarCard;
