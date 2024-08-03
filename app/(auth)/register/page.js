"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { HiOutlineMail } from "react-icons/hi";
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import { FaUser } from "react-icons/fa";
import Image from "next/image";
import Button from '@/lib/Button';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Page() {

  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: '',
    password: '',
    name: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const backendApi = process.env.NEXT_PUBLIC_BACKEND_API;
      const response = await axios.post(`${backendApi}/api/v1/registration`, {
        name: data.name,
        email: data.email,
        password: data.password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      toast.success(response.data);
    } catch (error) {
      console.log(error.message, 'error');
    }
  };

  return (
    <div className="flex justify-center items-center h-full min-h-screen p-4" style={{ backgroundImage: 'url(https://readymadeui.com/background-image.webp)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
      <form onSubmit={handleRegister} className="bg-opacity-70 bg-white max-w-md w-full mx-auto shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-8 rounded-2xl">
        <div className="mb-12">
          <h3 className=" text-3xl text-gray-800 font-bold text-center">Create an account</h3>
        </div>
        <div>
          <label className="text-gray-800 text-xs block mb-2">Full Name</label>
          <div className="relative flex items-center">
            <input onChange={handleChange} name="name" type="text" required className="bg-transparent w-full text-sm text-gray-800 border-b border-gray-400 focus:border-gray-800 px-2 py-3 outline-none placeholder:text-gray-800" placeholder="Enter Your Name" />
            <FaUser className='w-[18px] h-[18px] absolute right-2' />
          </div>
        </div>
        <div className="mt-8">
          <label className="text-gray-800 text-xs block mb-2">Email</label>
          <div className="relative flex items-center">
            <input onChange={handleChange} name="email" type="email" required className="bg-transparent w-full text-sm text-gray-800 border-b border-gray-400 focus:border-gray-800 px-2 py-3 outline-none placeholder:text-gray-800" placeholder="Enter email" />
            <HiOutlineMail className='w-[18px] h-[18px] absolute right-2' />
          </div>
        </div>
        <div className="mt-8">
          <label className="text-gray-800 text-xs block mb-2">Password</label>
          <div className="relative flex items-center">
              <input onChange={handleChange} name="password" type={showPassword ? 'text' : 'password'} required className="bg-transparent w-full text-sm text-gray-800 border-b border-gray-400 focus:border-gray-800 px-2 py-3 outline-none placeholder:text-gray-800" placeholder="Enter password" />{
                showPassword ?
                <IoEyeOutline onClick={() => setShowPassword(!showPassword)} className='w-[18px] h-[18px] cursor-pointer absolute right-2' />
                :
              <IoEyeOffOutline onClick={() => setShowPassword(!showPassword)} className='w-[18px] h-[18px] cursor-pointer absolute right-2' />
              }
            </div>
        </div>
        <div className="flex items-center mt-8">
          <input type="checkbox" className="h-4 w-4 shrink-0 rounded" />
          <label htmlFor="remember-me" className="ml-3 block text-sm">
            I accept the <a href="#" className="text-blue-500 font-semibold hover:underline">Privacy Policy</a> and <a href="#" className="text-blue-500 font-semibold hover:underline">Terms and Conditions</a>
          </label>
        </div>
        <div className="mt-8">
          <Button type="submit" title="Register" />
          <p className="text-gray-800 text-sm mt-8 text-center">Already have an account? <Link href="/login" className="text-blue-500 font-semibold hover:underline ml-1">Login here</Link></p>
        </div>
      </form>
    </div>
  );
}
