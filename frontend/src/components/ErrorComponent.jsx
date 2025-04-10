import React from 'react'

function ErrorComponent({ errorMessage }) {
  return (
    <div className='w-full pb-2 text-red-600 text-center text-lg rounded-lg'>
      {errorMessage}
    </div>
  )
}

export default ErrorComponent
