import React from 'react'

function Button({ buttonText, bgColor, width }) {
  return (
    <div className='flex justify-center'>
      <button className={`${bgColor} ${width} active:scale-[1.03] ease-in-out transition duration-200 rounded-lg cursor-pointer text-white px-4 py-2`}>{buttonText}</button>
    </div >
  )
}

export default Button
