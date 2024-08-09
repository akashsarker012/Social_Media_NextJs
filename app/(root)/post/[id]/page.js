"use client";
import React, { useEffect, useState } from 'react';
import PostCard from '@/components/cards/PostCard';
import { fetchPosts as fetchPostsData } from '@/lib/AllDataFetch';

export default function Page({ params }) {
  const { id } = params;
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await fetchPostsData();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }
    fetchPosts();
  }, [posts]);

  const filteredPosts = posts.filter(post => post._id === id);

  return (
    <div>
      {filteredPosts.length > 0 ? (
        filteredPosts.map(post => (
          <PostCard key={post._id} post={post} />
        ))
      ) : (
        <div>No posts found.</div>
      )}
    </div>
  );
}
