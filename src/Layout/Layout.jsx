import React, { useEffect } from "react";
import Header from "./Header";
import { getUserInfo } from "../Redux/slices/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { CircularProgress } from "@mui/material";
import {motion, AnimatePresence} from 'framer-motion'

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
      <AnimatePresence>
      {Object.keys(user).length > 0 ? (
        <>
          <Header />
          <motion.div style={{ height: "Calc(100vh - 100px)" }}>{children}</motion.div>
        </>
      ) : (
        <div className="w-screen h-screen flex items-center justify-center">
          <CircularProgress sx={{ color: "gray" }} size={60} />
        </div>
      )}
      </AnimatePresence>
    </div>
  );
};

export default Layout;
