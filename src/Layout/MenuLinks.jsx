import Link from "next/link";
import React from "react";

const MenuLinks = ({ to, text }) => {
  return (
    <Link className="text-gray-700 font-semibold text-2xl" href={to}>
      {text}
    </Link>
  );
};

export default MenuLinks;
