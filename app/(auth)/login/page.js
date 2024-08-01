"use client"
import axios from 'axios';
import Link from 'next/link';
import React, { useState } from 'react';
import { HiOutlineMail } from 'react-icons/hi';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { redirect } from 'next/navigation'

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const backendApi = process.env.NEXT_PUBLIC_BACKEND_API;
      const response = await axios.post(`${backendApi}/api/v1/login`, { email, password });
      console.log(response);
      if (response.data.verified === false) {
        router.push(`/emailverification?email=${encodeURIComponent(email)}`);
      } else if (response.data.error) {
        toast.error(response.data.error);
      }
      setError('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-full min-h-screen p-4" style={{ backgroundImage: 'url(https://readymadeui.com/background-image.webp)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: '',
          duration: 5000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            theme: {
              primary: 'green',
              secondary: 'black',
            },
          },
        }}
      />
      <div className="max-w-md w-full mx-auto">
        <form className="bg-opacity-70 bg-white rounded-2xl p-6 shadow-[0_2px_16px_-3px_rgba(6,81,237,0.3)]" onSubmit={handleLogin}>
          <div className="mb-12">
            <h3 className="text-gray-800 text-3xl font-extrabold">Sign in</h3>
          </div>
          <div>
            <div className="relative flex items-center">
              <input value={email} onChange={(e) => setEmail(e.target.value)} name="email" type="text" required className="bg-transparent w-full text-sm text-gray-800 border-b border-gray-400 focus:border-gray-800 px-2 py-3 outline-none placeholder:text-gray-800" placeholder="Enter email" />
              <HiOutlineMail className='w-[18px] h-[18px] absolute right-2' />
            </div>
          </div>
          <div className="mt-6">
            <div className="relative flex items-center">
              <input name="password" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required className="bg-transparent w-full text-sm text-gray-800 border-b border-gray-400 focus:border-gray-800 px-2 py-3 outline-none placeholder:text-gray-800" placeholder="Enter password" />
              {
                showPassword ?
                  <IoEyeOutline onClick={() => setShowPassword(!showPassword)} className='w-[18px] h-[18px] cursor-pointer absolute right-2' />
                  :
                  <IoEyeOffOutline onClick={() => setShowPassword(!showPassword)} className='w-[18px] h-[18px] cursor-pointer absolute right-2' />
              }
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
            <div className="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 border-gray-300 rounded" />
              <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-800">
                Remember me
              </label>
            </div>
            <div>
              <a href="#" className="text-blue-600 text-sm font-semibold hover:underline">
                Forgot Password?
              </a>
            </div>
          </div>
          {error && <div className="text-red-500 text-sm mt-4">{error}</div>}
          <div className="mt-12">
            <button type="submit" className="w-full bg-blue py-2.5 px-4 text-sm font-semibold tracking-wider rounded-full text-white hover:bg-blue-600 focus:outline-none">
              Sign in
            </button>
            <p className="text-gray-800 text-sm text-center mt-6"> Do not have an account?<Link href="/register" className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap">Register here</Link></p>
          </div>
          <hr className="my-6 border-gray-400" />
        </form>
      </div>
    </div>
  );
}
