import React from "react";
import UserCard from "./UserCard.jsx";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

function UserSection({ myBalance }) {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("jwtToken")).token;

    const fetchUsers = async () => {
      const response = await axios.get(`/get-profiles?filter=${search}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setUsers(response.data.data.users);
    }
    fetchUsers().then(() => console.log(users))
    console.log(users);
  }, [search])

  return (
    <div className="mx-20 bg-emerald-700 mt-6 rounded-xl">
      <div className="mx-auto py-6 px-10">
        <p className="text-3xl font-semibold my-3">Users</p>
        <div className="flex gap-x-6 text-2xl">
          <input type="text" onChange={(e) => setSearch(e.target.value)} placeholder="Enter Username" className="focus:outline-blue-600 px-4 py-2 w-full bg-white rounded-lg border-gray-200 border-2" />
        </div>
        <div className="grid grid-cols-4 mt-8 gap-y-6">
          {
            users.map((user, index) => (
              <UserCard key={index} userId={user._id} myBalance={myBalance} email={user.email} username={user.username} firstName={user.firstName} lastName={user.lastName} balance={user.balance} />
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default UserSection;
