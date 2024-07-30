"use client";
import Avatar from "@/lib/Avatar";
import Dropdowns from "@/lib/Dropdowns";
import Modal from "@/lib/Modal";
import UploadPost from "@/lib/UploadPost";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

function Topbar() {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setShow(false);
        setOpen(false);
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const backendApi = process.env.NEXT_PUBLIC_BACKEND_API;
    const fetchCurrentUser = async () => {
      try {
        const token = Cookies.get("user_id");
        if (!token) {
          throw new Error("Token not found");
        }
        const response = await axios.get(`${backendApi}/api/v1/current-user`, {
          headers: {
            "x-access-token": token,
          },
        });
        setCurrentUser(response?.data?.currentUser);
      } catch (error) {
        console.error("Error fetching current user:", error.message);
      }
    };
    fetchCurrentUser();
  }, []);

  console.log(currentUser, "current user");

  return (
    <nav className="topbar">
      <Link href="/" className="flex items-center gap-4">
        <Image src="/assets/logo.svg" alt="logo" width={28} height={28} />
        <p className="text-heading3-bold text-light-1 max-xs:hidden">Threads</p>
      </Link>
      <div className="flex items-center gap-6 cursor-pointer">
        <div>
          <Image src="/assets/create.svg" alt="Create Post" width={30} height={30} onClick={() => setShow(!show)} />
          {show && 
          <Modal background={true} dropRef={ref}>
            <UploadPost handleClose={() => setShow(false)} />
          </Modal>
          }
        </div>
        <div onClick={() => setOpen(true)} >
          <Avatar  imageURL={currentUser?.profilepic} />
          {open && 
          <Modal dropRef={ref}>
            <Dropdowns currentUser={currentUser} />
        </Modal>
          }
        </div>
      </div>
    </nav>
  );
}

export default Topbar;
