import React from "react";

function InputField({ label, placeholder, isRequired, type, value, onChange }) {
  return (
    <div className="flex-col items-center max-w-full py-2">
      <label className="block text-lg font-medium">{label}</label>
      <input value={value} onChange={onChange} className='border-gray-500/70 w-full border px-4 py-2 text-lg rounded-sm focus:outline-blue-600' placeholder={placeholder} required={isRequired} type={type} minLength={type === "password" ? 8 : undefined} />
    </div>
  );
}

export default InputField;
