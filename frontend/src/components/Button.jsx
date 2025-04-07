import React from 'react'

function Button({ buttonText, bgColor }) {
  return (
    <div className='flex justify-center'>
      <button className={`${bgColor} active:scale-105 transition duration-200 rounded-lg cursor-pointer text-white px-4 py-2`}>{buttonText}</button>
    </div >
  )
}

export default Button
