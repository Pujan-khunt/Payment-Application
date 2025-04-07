import React from "react";
import Dialog from "../components/Dialog.jsx";
import SadEmoji from "../Assets/images/sad-emoji-page-not-found.png";
import Header from "../components/Header.jsx";
import SubHeading from "../components/SubHeader.jsx";
import Button from "./Button.jsx";

function NotFound404() {
  return (
    <div className='h-full w-full flex justify-center items-center'>
      <Dialog>
        <div className="flex justify-center mb-4">
          <img src={SadEmoji} alt='Sad Emoji | Page Not Found' className='object-cover w-40 h-40' />
        </div>
        <Header headerText="404: Not Found" />
        <SubHeading subHeaderText="Oops! The page you're looking for doesn't exist or has been moved." />
        <Button buttonText="Back To Homepage" bgColor="bg-blue-600" />
      </Dialog>
    </div>
  );
}

export default NotFound404;
