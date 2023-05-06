import Image from "next/image";
import React from "react";
import Icon from "../../public/favicon.png";
import MenuLinks from "./MenuLinks";
import { useSelector } from "react-redux";

const Header = () => {
  const user = useSelector((state) => state.UserSlice?.userInfo);
  const links = [
    { id: 1, to: "/books", text: "Books" },
    { id: 2, to: "/profile", text: "Profile" },
  ];

  return (
    <div className="w-full h-20 bg-gray-200 p-2 gap-2 flex items-center">
      <div className="w-16">
        <Image src={Icon} height={40} width={50} />
      </div>
      <div className="flex items-center justify-center w-full gap-5">
        {links.map((el) => {
          return <MenuLinks to={el.to} text={el.text} />;
        })}
      </div>
      <div className="w-max flex flex-col">
        <span>{user?.name}</span>
        <span>{user?.email}</span>
      </div>
    </div>
  );
};

export default Header;
