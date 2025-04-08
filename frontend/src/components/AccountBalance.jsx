import React from "react";

function AccountBalance({ balance }) {
  return (
    <div className='my-4'>
      <div className='text-center text-3xl text-gray-700'>Your Account Balance: <span className='text-green-600'>₹{balance}</span></div>
    </div>
  );
}

export default AccountBalance;
