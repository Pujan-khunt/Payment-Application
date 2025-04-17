import React from 'react'
import { useNavigate } from "react-router-dom";

function CentralPiece() {
  const navigate = useNavigate();

  return (
    <div>
      <div className='flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]'>
        <h1 className='text-5xl font-bold text-white mb-4'>Welcome to Payap</h1>
        <p className='text-lg text-gray-300 mb-8'>Your one-stop solution for all your payment needs.</p>
        <button onClick={() => navigate("/sign-up")} className='bg-emerald-500 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-emerald-600 transition duration-300'>
          Get Started
        </button>
      </div>
    </div>
  )
}

export default CentralPiece
