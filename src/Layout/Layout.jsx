import React, { useEffect } from "react";
import Header from "./Header";
import { getUserInfo } from "../Redux/slices/UserSlice";
import { useDispatch, useSelector } from "react-redux";

const Layout = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserInfo());
  }, []);

  return (
    <div className="">
      <Header />
      <div style={{ height: "Calc(100vh - 100px)" }}>{children}</div>
    </div>
  );
};

export default Layout;
