import axiosInstance from "@/src/Axios/axiosInstance";
import SubmitButton from "@/src/Components/Buttons/SubmitButton";
import InputField from "@/src/Components/TextInput/TextInput";
import { apiRoutes } from "@/src/Constants/apiRoutes";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

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

  return (
    <div className="w-screen bg-gray-300 h-screen flex items-center justify-center">
      <div className="h-[500px] w-[500px] p-16 border rounded-lg border-[#b2afaf] shadow-2xl flex justify-between flex-col">
        <InputField
          name={"Name"}
          type="text"
          placeholder={"Enter your name"}
          value={name}
          handleChange={(e) => setName(e.target.value)}
        />
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
        <SubmitButton text={"Sign Up"} handleOnClick={handleOnClick} />
        {err.err && (
          <span className="text-red-600 text-center">{err.message}</span>
        )}
        <div className="text-center">
          Already have an accout ?{" "}
          <Link href={"/login"} className="underline text-blue-800">
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default login;
