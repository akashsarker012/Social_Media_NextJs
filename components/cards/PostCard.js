import React, { useState } from "react";
import Avatar from "@/lib/Avatar";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { FaHeart, FaRegCommentDots, FaRegHeart } from "react-icons/fa";
import { IoIosShareAlt } from "react-icons/io";
import axios from "axios";
import Comment from './Comment';

const PostCard = ({ post, currentUser }) => {
  const { _id: postId, owner, description, image, like, comment, created } = post;
  const [showComments, setShowComments] = useState(false);
  const currentUserLiked = like.includes(currentUser?.id);

  const handleLike = async () => {
    try {
      const backendApi = process.env.NEXT_PUBLIC_BACKEND_API;
      await axios.post(`${backendApi}/api/v1/like`, { postId, userId: currentUser?.id });
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="bg-[#121212] w-full py-4 max-w-lg rounded-lg overflow-hidden mx-auto mt-4">
      <div className="flex flex-1 items-center gap-3 px-6">
        <Avatar imageURL={owner.profilepic} />
        <div>
          <p className="text-[15px] text-gray-300 font-bold">{owner.name}</p>
          <p className="text-xs text-[#ffffffb3] mt-0.5">
            {moment(created).startOf('time').fromNow()}
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
        <button onClick={() => setShowComments(!showComments)} className="flex items-center gap-2">
          <FaRegCommentDots className="text-xl" />
          {comment.length} Comment
        </button>
        <button className="flex items-center gap-2">
          <IoIosShareAlt />
          Share
        </button>
      </div>
      {showComments && (
        <div className="px-6 py-4">
          {comment.map((com) => (
            <div key={com._id} className="flex items-start p-2 rounded-md mb-4 bg-zinc-900 min-w-fit">
              <Avatar disable={true}  imageURL={com.userId.profilepic} height={40} width={40} />
              <div className="ml-3">
                <p className="text-sm text-gray-300">{com.userId.name}</p>
                <p className="text-sm text-gray-200">{com.description}</p>
              </div>
            </div>
          ))}
          <Comment currentUser={currentUser} postId={postId} />
        </div>
      )}
    </div>
  );
};

export default PostCard;
