import Link from "next/link";
import React from "react";
import Chip from "@mui/material/Chip";

const MenuLinks = ({ to, text, path }) => {
  console.log(to, path);
  return (
    <Link
      scroll={false}
      className={`${to === path ? "font-bold" : ""} text-gray-700 text-2xl`}
      href={to}
    >
      <Chip
        variant="outlined"
        sx={{ cursor: "pointer", border: "1px solid gray" }}
        label={text}
      />
    </Link>
  );
};

export default MenuLinks;
