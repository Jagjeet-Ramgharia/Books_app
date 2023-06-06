import React, { useState, useEffect } from "react";

function InputField({
  name,
  placeholder,
  secret,
  type = "text",
  disabled,
  value,
  handleChange,
}) {
  const [fieldType, setFieldType] = useState();
  useEffect(() => {
    setFieldType(secret ? "password" : type);
  }, [secret]);

  return (
    <div className="w-full">
      {/* <label htmlFor={name}>{name}</label> */}
      <input
      autoComplete="off"
        value={value}
        onChange={handleChange}
        name={name}
        type={fieldType}
        className="inputField"
        placeholder={placeholder}
        disabled={disabled}
      />
    </div>
  );
}

export default InputField;
