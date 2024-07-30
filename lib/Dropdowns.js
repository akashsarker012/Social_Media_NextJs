import Link from 'next/link';
import React from 'react';
import { dropdown } from '@/constants';
import Avatar from './Avatar';
import Cookies from 'js-cookie';

export default function Dropdowns({ currentUser}) {
  const handleSignOut = () => {
    Cookies.remove('user_id'); 
    window.location.href = '/login';
  };

  return (
      <div className="absolute w-80 right-6 z-20 py-2 mt-2 overflow-hidden origin-top-right bg-white rounded-md shadow-xl dark:bg-gray-800">
        <div className="flex items-center p-3 -mt-2 text-gray-600 transform">
          <Avatar height={200} width={200} imageURL={currentUser?.profilepic} disable={true} />
          <div className="mx-1">
            <h1 className="text-sm font-semibold text-gray-700 dark:text-gray-200">{currentUser?.name}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">{currentUser?.email}</p>
          </div>
        </div>
        <hr className="border-gray-200 dark:border-gray-700" />
        {dropdown.map((item, index) => {
          if (item.value === 'Sign Out') {
            return (
              <div 
                key={index}
                className="flex items-center cursor-pointer p-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                onClick={handleSignOut}>
                {item.icon}
                <span className="mx-1">{item.label}</span>
              </div>
            );
          }
          return (
            <div 
              key={index}
              className="flex items-center cursor-pointer p-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white" >
              {item.icon}
              <span className="mx-1">{item.label}</span>
            </div>
          );
        })}
      </div>
  );
}
