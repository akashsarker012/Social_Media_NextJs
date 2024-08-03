"use client"
import React, { useEffect, useState } from "react";
import Avatar from "@/lib/Avatar";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { FaHeart, FaRegCommentDots, FaRegHeart } from "react-icons/fa";
import { IoIosShareAlt } from "react-icons/io";
import axios from "axios";
import CurrentUser from './../../lib/CurrentUser';

const PostCard = ({ postId, ownerImage, name, time, image, description, like }) => {
  useEffect(() => {
    console.log("Post ID:", postId); // Log the postId when the component mounts
  }, [postId]);

  const  {currentUser} = CurrentUser();

  const currentUserLiked = like.includes(currentUser?.id)
  const [prev, setPrev] = useState(currentUserLiked);

  const handleLike = async () => {
    try {
      const res = await axios.post('http://localhost:8000/api/v1/like', { postId , userId: currentUser?.id });
     
      console.log(res);
    } catch (error) {
      console.error( error.message);
    }
  };

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
        
            <button onClick={handleLike} className="flex items-center gap-2">
              {currentUserLiked ? <FaHeart className="text-xl text-red-500 " /> : <FaRegHeart className="text-xl" />}
              {like.length} Like
            </button>
        <button onClick={() => setPrev(!prev)} className="flex items-center gap-2">
          <FaRegCommentDots className="text-xl" />
          Comment
        </button>
       
        <button className="flex items-center gap-2">
          <IoIosShareAlt />
          Share
        </button>
      </div>
      {
          prev && (
            <div>
              <p>Comment</p>
            </div>
          )
        }
    </div>
  );
};

export default PostCard;


