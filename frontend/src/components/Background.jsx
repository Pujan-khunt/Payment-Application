import React from "react";

function Background({ children }) {
  return (
    <div className='h-screen w-screen bg-gradient-to-r from-gray-800 via-gray-800 to-gray-900'>
      {children}
    </div>
  );
}

export default Background;
