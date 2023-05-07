import { CircularProgress } from "@mui/material";
import React from "react";

const SubmitButton = ({ text, classNames, handleOnClick, isLoading }) => {
  return (
    <button
      onClick={handleOnClick}
      className={`${classNames} bg-gray-700 text-white h-10 outline-none border-none rounded-lg`}
    >
      {isLoading ? (
        <CircularProgress sx={{ color: "white" }} size={16} />
      ) : (
        text
      )}
    </button>
  );
};

export default SubmitButton;
