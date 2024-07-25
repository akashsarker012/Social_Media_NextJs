"use client"
import Avatar from "@/lib/Avatar";
import Dropdowns from "@/lib/Dropdowns";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Cookies from 'js-cookie';
import axios from "axios";

function Topbar() {
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const ref = useRef()
  const handleDropdowns = () => {
    setOpen(!open);
  }
  useEffect(() => { 
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
  }, [ref]);

  useEffect(() => {
    const backendApi = process.env.NEXT_PUBLIC_BACKEND_API;
    const fetchCurrentUser = async () => {
      try {
        const token = Cookies.get('user_id');
        if (!token) {
          throw new Error('Token not found');
        }
        const response = await axios.get(`${backendApi}/api/v1/current-user`, {
          headers: {
            'x-access-token': token
          }
        });
        setCurrentUser(response.data.currentUser);
      } catch (error) {
        console.error('Error fetching current user:', error.message);
      }
    };
    fetchCurrentUser();
  }, []);
  console.log(currentUser, 'current user');
  
  return (
    <nav className='topbar'>
      <Link href='/' className='flex items-center gap-4'>
        <Image src='/assets/logo.svg' alt='logo' width={28} height={28} />
        <p className='text-heading3-bold text-light-1 max-xs:hidden'>Threads</p>
      </Link>
      <div ref={ref} onClick={handleDropdowns}>
        <Avatar
        />
        {
          open &&
          <Dropdowns
          currentUser={currentUser}
          />
        }
      </div>
    </nav>
  );
}

export default Topbar;