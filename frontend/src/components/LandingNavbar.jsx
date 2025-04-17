import React from 'react'
import ListItem from './ListItem'
import { useNavigate } from 'react-router-dom';

function LandingNavbar() {
  const navigate = useNavigate();

  return (
    <div className='w-full h-16 bg-emerald-500 flex items-center px-4 shadow-md'>
      <div className="text-3xl flex-1 drop-shadow-2xl font-extrabold bg-gradient-to-r from-teal-200  to-green-200 bg-clip-text text-transparent ml-2">
        PayaP
      </div>
      <ul className='flex gap-x-4 items-center'>
        <ListItem onClick={() => navigate("/sign-up")} content="Sign Up" />
        <ListItem onClick={() => navigate(("/sign-in"))} content="Sign In" />
      </ul>
    </div>
  )
}

export default LandingNavbar
