import Link from 'next/link';
import React from 'react'
import { IoHelpCircleOutline, IoLogOutOutline, IoSettingsOutline } from "react-icons/io5";
import { AiOutlineTeam } from "react-icons/ai";
import { dropdown } from '@/constants';
import Avatar from './Avatar';


export default function Dropdowns({currentUser}) {
  console.log(currentUser)
  return (
    <div className="relative inline-block ">
      <div className="absolute right-6 z-20 w-56 py-2 mt-2 overflow-hidden origin-top-right bg-white rounded-md shadow-xl dark:bg-gray-800">
        <Link href={currentUser.id} className="flex items-center p-3 -mt-2 text-sm text-gray-600 transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
          <Avatar
          disable={true} >
          </Avatar>

          <div className="mx-1">
            <h1 className="text-sm font-semibold text-gray-700 dark:text-gray-200">{currentUser.name}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">{currentUser.email}</p>
          </div>
        </Link>
        <hr className="border-gray-200 dark:border-gray-700 " />
        {
          dropdown.map((item) => {
            // console.log(item);
            return (
              <div className="flex items-center cursor-pointer p-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">

                <>
                  {item.icon}
                </>
                <span className="mx-1">
                  {item.label}
                </span>
              </div>
            )
          })
        }
      </div>
    </div>

  )
}
