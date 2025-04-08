import React from "react";
import Background from "../components/Background.jsx";
import Dialog from "../components/Dialog.jsx";
import Header from "../components/Header";
import Button from "../components/Button";
import AvatarCard from "../components/AvatarCard.jsx";
import SendMoneyForm from "../components/SendMoneyForm.jsx";
import VerticalGap from "../components/VerticalGap.jsx";
import AccountBalance from "../components/AccountBalance.jsx";

function SendMoney() {
  return (
    <Background>
      <div className="flex justify-center items-center h-full">
        <Dialog>
          <Header headerText="Send Money" />
          <VerticalGap gap="my-3"/>
          <AvatarCard name="Pujan Khunt" phoneNumber="+91 8490089630"/>
          <AccountBalance balance={993}/>
          <VerticalGap gap="my-3"/>
          <SendMoneyForm />
          <Button buttonText="Initiate Transfer" bgColor="bg-green-600" width="w-full" />
        </Dialog>
      </div>
    </Background>
  );
}

export default SendMoney;
