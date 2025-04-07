import React from "react";

function Dialog({ children }) {
  return (
    <div className='w-lg bg-white rounded-lg py-8 px-6 shadow-xl'>
      {children}
    </div>
  );
}

export default Dialog;
