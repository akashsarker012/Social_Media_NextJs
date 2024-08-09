"use client";
import { useEffect, useRef, useState } from "react";
import Avatar from "@/components/layout/Avatar";
import Dropdowns from "@/components/layout/Dropdowns";
import Image from "next/image";
import Link from "next/link";
import CurrentUser from "@/lib/CurrentUser";
import Modal from "@/components/layout/Modal";
import UploadPost from "../layout/UploadPost";

function Topbar() {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setShow(false);
        setOpen(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const { currentUser } = CurrentUser() || {};

  return (
    <nav className="topbar">
      <Link href="/" className="flex items-center gap-4">
        <Image src="/assets/logo.svg" alt="logo" width={28} height={28} />
        <p className="text-heading3-bold text-light-1 max-xs:hidden">Threads</p>
      </Link>
      <div className="flex items-center gap-6 cursor-pointer">
        <div>
          <Image
            src="/assets/create.svg"
            alt="Create Post"
            width={30}
            height={30}
            onClick={() => setShow(!show)}/>
          {show && (
             <Modal background={true} dropRef={ref}>
             <UploadPost handleClose={() => setShow(false)} />
           </Modal>
             
          )}
        </div>
        <div onClick={() => setOpen(true)}>
          <Avatar imageURL={currentUser?.profilepic} />
          {open && (
            <Modal dropRef={ref}>
              <Dropdowns currentUser={currentUser} />
            </Modal>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Topbar;
