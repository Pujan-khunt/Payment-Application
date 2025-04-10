import React from 'react'

function ErrorComponent({errorMessage}) {
  return (
    <div className='w-full bg-red-500 rounded-md p-4 text-center'>
      {errorMessage}
    </div>
  )
}

export default ErrorComponent
