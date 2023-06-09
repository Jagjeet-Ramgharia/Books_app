import { CircularProgress } from "@mui/material";
import React from "react";

const SubmitButton = ({
  text,
  classNames,
  handleOnClick,
  isLoading,
  disabled,
}) => {
  return (
    <button
      id="button"
      disabled={disabled}
      onClick={handleOnClick}
      className={`${classNames} disabled:cursor-not-allowed text-white h-10 outline-none border-none rounded-lg`}
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
