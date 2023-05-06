import axiosInstance from "@/src/Axios/axiosInstance";
import SubmitButton from "@/src/Components/Buttons/SubmitButton";
import InputField from "@/src/Components/TextInput/TextInput";
import { apiRoutes } from "@/src/Constants/apiRoutes";
import Link from "next/link";
import React, { useState } from "react";

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState({
    err: false,
    message: "",
  });

  function handleOnClick(e) {
    e.preventDefault();
    axiosInstance
      .post(apiRoutes.login, {
        email,
        password,
      })
      .then((res) => {
        console.log("res", res);
        if (res.status === 200) {
          localStorage.setItem("token", res.data.token);
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

  return (
    <div className="w-screen bg-gray-300 h-screen flex items-center justify-center">
      <div className="h-[400px] w-[500px] p-16 border rounded-lg border-[#b2afaf] shadow-2xl flex flex-col justify-between">
        <InputField
          name={"Email"}
          type="text"
          placeholder={"Enter your email"}
          value={email}
          handleChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          type="password"
          name={"Password"}
          placeholder={"*******"}
          value={password}
          handleChange={(e) => setPassword(e.target.value)}
        />
        <SubmitButton text={"Login"} handleOnClick={handleOnClick} />
        {err.err && (
          <span className="text-red-600 text-center">{err.message}</span>
        )}
        <div className="text-center">
          Did't have an accout ?{" "}
          <Link href="/signup" className="underline text-blue-800">
            SignUp here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default login;
