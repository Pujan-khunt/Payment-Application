import React from "react";

function FormWrapper({ children, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      {children}
    </form>
  );
}

export default FormWrapper;
