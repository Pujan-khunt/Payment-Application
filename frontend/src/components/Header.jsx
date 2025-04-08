import React from "react";

function Header({ headerText }) {
  return (
    <div className='text-5xl text-center py-4 font-semibold'>{headerText}</div>
  );
}

export default Header;
