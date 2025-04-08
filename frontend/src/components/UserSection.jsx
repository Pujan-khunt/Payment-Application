import React from "react";
import UserCard from "./UserCard.jsx";
import Photo from "../Assets/images/profile.jpg";

function UserSection() {
  return (
    <div className="mx-20 bg-emerald-700 mt-6 rounded-xl">
      <div className="mx-auto py-6 px-10">
        <p className="text-3xl font-semibold my-3">Users</p>
        <div className="flex gap-x-6 text-2xl">
          <input type="text" placeholder="Enter Username" className="focus:outline-blue-600 px-4 py-2 w-full bg-white rounded-lg border-gray-200 border-2" />
        </div>
        <div className="flex justify-between mt-6">
          <UserCard avatarUrl={Photo} firstName="Pujan" lastName="Khunt" phoneNumber="+91 8490089630"/>
          <UserCard avatarUrl={Photo} firstName="Pujan" lastName="Khunt" phoneNumber="+91 8490089630"/>
          <UserCard avatarUrl={Photo} firstName="Pujan" lastName="Khunt" phoneNumber="+91 8490089630"/>
          <UserCard avatarUrl={Photo} firstName="Pujan" lastName="Khunt" phoneNumber="+91 8490089630"/>
        </div>
      </div>
    </div>
  );
}

export default UserSection;
