import React, { useState } from "react";
import Avatar from "@/lib/Avatar";
import axios from "axios";
import toast from "react-hot-toast";
import { IoMdSend } from "react-icons/io";

export default function Comment({ postId, currentUser }) {
  const [comment, setComment] = useState("");

  const handleComment = async (e) => {
    e.preventDefault();

    if (!comment.trim()) {
      toast.error("Comment cannot be empty.");
      return;
    }

    try {
      const backendApi = process.env.NEXT_PUBLIC_BACKEND_API;
      const res = await axios.post(`${backendApi}/api/v1/comment`, {
        description: comment,
        userId: currentUser?.id,
        postId,
      });

      toast.success(res.data.message);
      setComment("");
    } catch (error) {
      console.log(error);
      toast.error("Failed to post comment.");
    }
  };

  return (
    <form onSubmit={handleComment}>
      <div className="flex items-center px-3 py-2 rounded-lg bg-zinc-900">
        <Avatar height={40} width={40} disable={true} />
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="textarea-expand block mx-4 p-1 w-full text-white text-sm bg-zinc-800 rounded-lg border border-gray-500 focus:outline-none"
          placeholder="Your message..."
        />
        <button type="submit">
          <IoMdSend className="w-6 h-6 text-white cursor-pointer" />
        </button>
      </div>
    </form>
  );
}
