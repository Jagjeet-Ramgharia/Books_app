import Link from "next/link";
import React from "react";

const MenuLinks = ({ to, text }) => {
  return (
    <Link className="text-blue-500 font-semibold text-lg" href={to}>
      {text}
    </Link>
  );
};

export default MenuLinks;
