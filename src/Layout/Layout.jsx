import React, { useEffect, useRef } from "react";
import Header from "./Header";
import { getUserInfo } from "../Redux/slices/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { CircularProgress } from "@mui/material";
import PageTransition from "../Components/PageTransition/PageTransition";

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const ref = useRef();
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
    <div className="h-screen background bg-gray-100 overflow-hidden">
      {Object.keys(user).length > 0 ? (
        <div style={{ height: "100%", width:"100vw", zIndex:9999 }}  className="">
          <Header />
          <PageTransition ref={ref}>
            <div >{children}</div>
          </PageTransition>
        </div>
      ) : (
        <div className="w-screen h-screen flex items-center justify-center">
          <CircularProgress sx={{ color: "gray" }} size={60} />
        </div>
      )}
    </div>
  );
};

export default Layout;
