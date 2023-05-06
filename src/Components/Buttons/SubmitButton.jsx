import React from "react";

const SubmitButton = ({ text, classNames, handleOnClick }) => {
  return (
    <button
      onClick={handleOnClick}
      className={`${classNames} bg-gray-700 text-white h-10 outline-none border-none rounded-lg`}
    >
      {text}
    </button>
  );
};

export default SubmitButton;
