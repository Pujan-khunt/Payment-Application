import React from "react";
import InputField from "./InputField";

function SendMoneyInput() {
  return (
    <InputField type="number" placeholder="100" label="Amount (In Rs)" isRequired={true} />
  );
}

export default SendMoneyInput;
