import Image from "next/image";
import React from "react";
import Icon from "../../public/favicon.png";
import MenuLinks from "./MenuLinks";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const Header = () => {
  const user = useSelector((state) => state.UserSlice?.userInfo);
  const path = usePathname();
  const links = [
    { id: 1, to: "/books", text: "Books" },
    { id: 2, to: "/profile", text: "Profile" },
  ];

  return (
    <div className="w-full h-[100px] bg-gray-200 p-2 gap-2 flex items-center">
      <div className="">
        <Image src={Icon} height={40} width={50} />
      </div>
      <div className="flex items-center justify-center w-full gap-5">
        {links.map((el) => {
          return (
            <motion.div
              whileHover={{ scale: 1.1 }}
              key={el.id}
            >
              <MenuLinks to={el.to} text={el.text} path={path} />
            </motion.div>
          );
        })}
      </div>
      <div className="w-max flex flex-col">
        <span className="text-gray-700">{user?.name}</span>
        <span className="text-gray-700">{user?.email}</span>
      </div>
    </div>
  );
};

export default Header;
