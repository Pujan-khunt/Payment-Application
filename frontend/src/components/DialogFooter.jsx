import React from "react";

function DialogFooter({ onClick, footerText, footerLinkText }) {
  return (
    <div className='w-full flex justify-center mt-4'>
      <div>{footerText}</div>
      <div onClick={onClick} className='ml-1 underline cursor-pointer'>{footerLinkText}</div>
    </div>
  );
}

export default DialogFooter;
