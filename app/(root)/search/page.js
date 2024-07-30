"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import { RowsPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";

const breakpoints = [1080, 640, 384, 256, 128, 96, 64, 48];
function assetLink(url, width) {
  return `${url}?w=${width}&q=75`;
}

async function getData() {
  const backendApi = process.env.NEXT_PUBLIC_BACKEND_API;
  const res = await axios.get(`${backendApi}/api/v1/get-allpost`);

  if (res.status !== 200) {
    throw new Error("Failed to fetch data");
  }

  return res.data;
}

function App() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await getData();
        if (!Array.isArray(data)) {
          throw new Error("API response is not an array");
        }
        const formattedPhotos = data.map(({ image, description }) => {
         
          const width = 1080; 
          const height = 720;

          return {
            src: assetLink(image, width),
            alt: description || "No description",
            width,
            height,
            srcSet: breakpoints.map(breakpoint => ({
              src: assetLink(image, breakpoint),
              width: breakpoint,
              height: Math.round((height / width) * breakpoint)
            }))
          };
        });

        setPhotos(formattedPhotos);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }

    fetchPosts();
  }, []);

  return (
    <div>
      {photos.length > 0 ? (
        <RowsPhotoAlbum photos={photos} />
      ) : (
        <p>Loading photos...</p>
      )}
    </div>
  );
}

export default App;
