"use client"
import axios from 'axios';
import Link from 'next/link';
import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation'

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/v1/login', { email, password });
      console.log(response.data);
      Cookies.set('user_id', response.data.token); 
      router.push('/', { scroll: false })
      setError('');
    } catch (error) {
      console.log(error)
      setError(error);
    }
  };

  return (
    <div className="flex justify-center items-center font-[sans-serif] h-full min-h-screen p-4" style={{backgroundImage: 'url(https://readymadeui.com/background-image.webp)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
      <div className="max-w-md w-full mx-auto">
        <form className="bg-opacity-70 bg-white rounded-2xl p-6 shadow-[0_2px_16px_-3px_rgba(6,81,237,0.3)]" onSubmit={handleLogin}>
          <div className="mb-12">
            <h3 className="text-gray-800 text-3xl font-extrabold">Sign in</h3>
          </div>
          <div>
            <div className="relative flex items-center">
              <input value={email} onChange={(e) => setEmail(e.target.value)} name="email" type="text" required className="bg-transparent w-full text-sm text-gray-800 border-b border-gray-400 focus:border-gray-800 px-2 py-3 outline-none placeholder:text-gray-800" placeholder="Enter email" />
              <svg xmlns="http://www.w3.org/2000/svg" fill="#333" stroke="#333" className="w-[18px] h-[18px] absolute right-2" viewBox="0 0 682.667 682.667">
                <defs>
                  <clipPath id="a" clipPathUnits="userSpaceOnUse">
                    <path d="M0 512h512V0H0Z" data-original="#000000" />
                  </clipPath>
                </defs>
                <g clipPath="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                  <path fill="none" strokeMiterlimit={10} strokeWidth={40} d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z" data-original="#000000" />
                  <path d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z" data-original="#000000" />
                </g>
              </svg>
            </div>
          </div>
          <div className="mt-6">
            <div className="relative flex items-center">
              <input name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="bg-transparent w-full text-sm text-gray-800 border-b border-gray-400 focus:border-gray-800 px-2 py-3 outline-none placeholder:text-gray-800" placeholder="Enter password" />
              <svg xmlns="http://www.w3.org/2000/svg" fill="#333" stroke="#333" className="w-[18px] h-[18px] absolute right-2 cursor-pointer" viewBox="0 0 128 128">
                <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000" />
              </svg>
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
          <div className="space-x-8 flex justify-center">
            <button type="button" className="border-none outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" width="30px" className="inline" viewBox="0 0 512 512">
                <path fill="#fbbd00" d="M120 256c0-25.367 6.989-49.13 19.131-69.477v-86.308H52.823C18.568 144.703 0 198.922 0 256s18.568 111.297 52.823 155.785h86.308v-86.308C126.989 305.13 120 281.367 120 256z" data-original="#fbbd00" />
                <path fill="#0f9d58" d="m256 392-60 60 60 60c57.079 0 111.297-18.568 155.785-52.823v-86.216h-86.216C305.044 385.147 281.181 392 256 392z" data-original="#0f9d58" />
                <path fill="#31aa52" d="m139.131 325.477-86.308 86.308a260.085 260.085 0 0 0 22.158 25.235C123.333 485.371 187.62 512 256 512V392c-49.624 0-93.117-26.72-116.869-66.523z" data-original="#31aa52" />
                <path fill="#3c79e6" d="M512 256a258.24 258.24 0 0 0-4.192-46.377l-2.251-12.299H256v120h121.115c-7.549 25.667-29.898 44.679-56.115 48.854l-.027.004-5.739.684L344 512l60-60v-91.554c31.876-14.249 56-45.009 56-82.446z" data-original="#3c79e6" />
                <path fill="#cf2d48" d="M409.387 141.61c-27.112-4.156-56.956-4.727-87.387-3.609v-86.261h-86.216C202.956 18.724 227.69 0 256 0c33.864 0 65.9 11.596 91.387 31.021L344 85.029l65.301 56.284z" data-original="#cf2d48" />
              </svg>
            </button>
            <button type="button" className="border-none outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" width="30px" className="inline" viewBox="0 0 512 512">
                <path fill="#3b5998" d="M210.832 512V299.275H158.82V224h52.012v-63.483c0-50.857 31.123-78.537 76.271-78.537 21.57 0 40.083 1.607 45.41 2.322v55.877H315.38c-24.447 0-29.194 11.622-29.194 28.712V224h58.564l-7.65 75.275h-50.914V512h-62.118z" data-original="#3b5998" />
                <path fill="#fff" d="M315.38 512l-7.65-75.275h-50.913V299.275h58.563V224h-58.563v-63.483c0-17.089 4.747-28.712 29.194-28.712h41.404v-55.877c-5.327-.715-23.84-2.322-45.41-2.322-45.148 0-76.271 27.68-76.271 78.537v63.483h-47.729v75.275h47.729V512h-74.194C80.5 512 0 431.5 0 336.118V176.548C0 81.618 80.5 0 175.194 0h161.988C431.5 0 512 81.618 512 176.548v159.57C512 431.5 431.5 512 336.182 512h-20.802z" data-original="#ffffff" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
