
"use client"
import React, { useEffect, useState } from "react";
import axios from "axios"
import PostCard from "@/components/cards/PostCard";

async function getData() {
  const backendApi = process.env.NEXT_PUBLIC_BACKEND_API;
  const res = await axios.get(`${backendApi}/api/v1/get-allpost`);

  if (res.status !== 200) {
    throw new Error("Failed to fetch data");
  }

  return res.data;
}

export default function getAllPost() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await getData();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }
    fetchPosts();
  }, [posts]);

  return (
    <div className="flex flex-col items-center justify-between ">
      {posts.map((post, index) => (
        <PostCard
          key={index}
          postId={post._id}
          ownerImage={post.owner.profilepic}
          name={post.owner.name}
          time={post.createdAt}
          image={post.image}
          like={post.like}
          description={post.description}
        />
      ))}
    </div>
  );
}
