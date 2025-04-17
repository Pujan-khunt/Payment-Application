import React from "react";
import Background from "../components/Background.jsx";
import Dialog from "../components/Dialog.jsx";
import Header from "../components/Header";
import Button from "../components/Button";
import AvatarCard from "../components/AvatarCard.jsx";
import InputField from "../components/InputField.jsx"
import VerticalGap from "../components/VerticalGap.jsx";
import AccountBalance from "../components/AccountBalance.jsx";
import FormWrapper from "../components/FormWrapper.jsx";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function SendMoney() {
  const location = useLocation();
  const { email, name, username, myBalance, userId } = location.state?.data;
  const [amount, setAmount] = useState(0);

  const handleSendMoney = async (e) => {
    e.preventDefault();

    if (amount > myBalance) {
      alert("Insufficient Balance");
      return;
    }

    const jwtToken = JSON.parse(localStorage.getItem("jwtToken")).token;
    const response = await axios.post("/transfer", {
      recipientId: userId,
      amount: amount
    }, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    });
    console.log(response);

    if (response.data.success) {
      alert("Money Sent Successfully");
    } else {
      alert("Failed to send money");
    }
  }

  return (
    <Background>
      <div className="flex justify-center items-center h-full">
        <Dialog>
          <Header headerText="Send Money" />
          <VerticalGap gap="my-3" />
          <AvatarCard username={username} fullName={name} email={email} />
          <AccountBalance balance={myBalance} />
          <VerticalGap gap="my-3" />
          <FormWrapper onSubmit={handleSendMoney}>
            <InputField onChange={(e) => setAmount(Number(e.target.value))} type="number" placeholder="100" label="Amount (In Rs)" isRequired={true} />
            <Button buttonText="Initiate Transfer" bgColor="bg-green-600" width="w-full" />
          </FormWrapper>
        </Dialog>
      </div>
    </Background>
  );
}

export default SendMoney;
