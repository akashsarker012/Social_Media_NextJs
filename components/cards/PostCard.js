import Avatar from "@/lib/Avatar";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaRegCommentDots, FaRegHeart } from "react-icons/fa";
import { IoIosShareAlt } from "react-icons/io";

function PostCard({ name, time, image, description, ownerImage }) {
  return (
    <div className="bg-[#121212] w-full py-4 max-w-lg rounded-lg overflow-hidden mx-auto mt-4">
      <div className="flex flex-1 items-center gap-3 px-6">
        <Avatar imageURL={ownerImage} />
        <div>
          <p className="text-[15px] text-gray-300 font-bold">{name}</p>
          <p className="text-xs text-[#ffffffb3] mt-0.5">
          {/* {moment(time).startOf('time').fromNow()} */}
          {moment(time).endOf('hour').fromNow()}
          </p>
        </div>
      </div>
      <div className="w-full min-h-[300px]">
        <Link href={image}>
          <Image
            src={image}
            width={0}
            height={100}
            sizes="100vw"
            style={{ width: "100%", margin: "20px 0" }}
            alt="image"
          />
        </Link>
      </div>

      <div className="px-6">
        <p className="text-sm text-gray-300 leading-relaxed">{description}</p>
      </div>
      <hr className="text-light-3 my-3" />
      <div className="flex text-light-1 justify-between items-center px-6 p-2 bg-[#121212]">
        <button className="flex items-center gap-2">
          <FaRegHeart className="text-xl" />
          Like
        </button>
        <button className="flex items-center gap-2">
          <FaRegCommentDots className="text-xl" />
          Comment
        </button>
        <button className="flex items-center gap-2">
          <IoIosShareAlt />
          Share
        </button>
      </div>
    </div>
  );
}

export default PostCard;
