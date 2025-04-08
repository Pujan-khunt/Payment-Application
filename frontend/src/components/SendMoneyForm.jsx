import React from "react";
import InputField from "./InputField";

function SendMoneyForm() {
  return (
    <div>
      <InputField type="number" placeholder="100" label="Amount (In Rs)" isRequired={true} />
    </div>
  );
}

export default SendMoneyForm;
