"use client";
import React, { useState, useRef, useEffect } from "react";
import Button from "@/components/layout/Button";
import Cookies from "js-cookie";
import axios from "axios";
import toast from "react-hot-toast";

const EmailVerification = () => {
  const [email, setEmail] = useState("");
  const inputsRef = useRef([]);
  useEffect(() => {
    const email = Cookies.get('email')
    
    if (email) {
      setEmail(email);
    }
  }, [email]);

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (value.length === 1 && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && index > 0 && e.target.value === "") {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleOtpverify = (e) => {
    e.preventDefault();
    try {
      const otp = inputsRef.current.map((input) => input.value).join("");
      console.log(otp);
      const backendApi = process.env.NEXT_PUBLIC_BACKEND_API;
      const response = axios.post(`${backendApi}/api/v1/verify-otp`, { otp,email }).then((response) => {
        if(response.data.error){
          toast.error(response.data.error);
        }else{
          toast.success(response.data.success);
          Cookies.remove('email');
          setTimeout(() => {
            window.location.href = '/login';
          }, 2000);
        }
      })
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
      <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-10">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">Email Verification</div>
            <div className="flex flex-row text-sm font-medium text-gray-400 ">
              <p >We have sent a code to your email: <span className="  text-gray-500">{email}</span> </p>
            </div>
          </div>
          <div>
            <form method="post" onSubmit={handleOtpverify}>
              <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                {[...Array(6)].map((_, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputsRef.current[index] = el)}
                    className="w-12 h-12 text-center border rounded-lg text-lg"
                    type="text"
                    maxLength="1"
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                  />
                ))}
              </div>
              <div className="flex flex-col space-y-5 mt-6">
                <Button title="Submit" type="submit" />
                <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                  <p>Didn't receive the code?</p>
                  <a
                    className="text-blue-600"
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer" >
                    Resend
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification
