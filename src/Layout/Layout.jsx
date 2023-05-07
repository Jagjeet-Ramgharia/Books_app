import React, { useEffect } from "react";
import Header from "./Header";
import { getUserInfo } from "../Redux/slices/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { CircularProgress } from "@mui/material";

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const location = useRouter();
  const user = useSelector((state) => state.UserSlice?.userInfo);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(getUserInfo());
    } else {
      location.push("/login");
    }
  }, []);

  return (
    <div className="">
      {Object.keys(user).length > 0 ? (
        <>
          <Header />
          <div style={{ height: "Calc(100vh - 100px)" }}>{children}</div>
        </>
      ) : (
        <div className="w-screen h-screen flex items-center justify-center">
          <CircularProgress sx={{ color: "gray" }} size={60} />
        </div>
      )}
    </div>
  );
};

export default Layout;
