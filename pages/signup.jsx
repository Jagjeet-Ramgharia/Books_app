import axiosInstance from "@/src/Axios/axiosInstance";
import SubmitButton from "@/src/Components/Buttons/SubmitButton";
import InputField from "@/src/Components/TextInput/TextInput";
import { apiRoutes } from "@/src/Constants/apiRoutes";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";

const Particals = dynamic(
  () => import("@/src/Components/ParticleJs/Particals"),
  {
    ssr: false,
  }
);

const login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState({
    err: false,
    message: "",
  });
  const location = useRouter();

  function handleOnClick(e) {
    e.preventDefault();
    axiosInstance
      .post(apiRoutes.signUp, {
        name,
        email,
        password,
      })
      .then((res) => {
        if (res.status === 201) {
          location.push("/login");
        }
      })
      .catch((err) => {
        if (err?.response?.data?.errors?.[0]) {
          setErr({
            err: true,
            message: err?.response?.data?.errors?.[0]?.msg,
          });
        }
        console.log("err", err);
      });
  }

    const config = {
    type: "spring",
    damping: 20,
    stiffness: 120,
  };

  return (
    <AnimatePresence presenceAffectsLayout>
      <motion.div
      transition={config}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ x: 0, opacity: 0 }}
      className="w-screen h-screen flex items-center justify-center">
        <form className="form_main z-50 shadow-2xl" action="">
          <p className="heading">SignUp</p>
          <div className="inputContainer">
            <svg
              viewBox="0 0 16 16"
              fill="#2e2e2e"
              height="16"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
              className="inputIcon"
            >
              <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
            </svg>
            <InputField
              name={"Name"}
              type="text"
              placeholder={"Enter your name"}
              value={name}
              handleChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="inputContainer">
            <svg
              viewBox="0 0 16 16"
              fill="#2e2e2e"
              height="16"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
              className="inputIcon"
            >
              <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
            </svg>
            <InputField
              name={"Email"}
              type="text"
              placeholder={"Enter your email"}
              value={email}
              handleChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="inputContainer">
            <svg
              viewBox="0 0 16 16"
              fill="#2e2e2e"
              height="16"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
              className="inputIcon"
            >
              <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
            </svg>
            <InputField
              type="password"
              name={"Password"}
              placeholder={"*******"}
              value={password}
              handleChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <SubmitButton text={"Sign Up"} handleOnClick={handleOnClick} />
          {err.err && (
            <span className="text-red-600 text-center">{err.message}</span>
          )}
          <div className="signupContainer">
            <p>Already have an accout?</p>
            <Link href={"/login"} className="underline text-blue-800">
              Login
            </Link>
          </div>
        </form>
        <Particals />
      </motion.div>
    </AnimatePresence>
  );
};

export default login;
