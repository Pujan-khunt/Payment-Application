import React from "react";

function SubmitButton({ buttonText }) {
  return (
    <div className='mt-2'>
      <button className='w-full bg-black h-12 text-white rounded-lg font-semibold' type="submit">{buttonText}</button>
    </div>
  );
}

export default SubmitButton;
