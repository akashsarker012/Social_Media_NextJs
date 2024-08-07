import Image from "next/image";
import React from "react";
import { FaUserCircle } from "react-icons/fa";

export default function Avatar({ imageURL, width = 60, height = 60, disable }) {
  return (
    <div className="relative inline-block cursor-pointer">
      {imageURL ? (
        <Image 
          src={imageURL} 
          width={width} 
          height={height} 
          className="rounded-full border-2 border-blue-600 p-0.5" 
          alt="profile" 
        />
      ) : (
        <FaUserCircle 
          className="text-gray-500" 
          style={{ width: `${width}px`, height: `${height}px` }} 
        />
      )}
      {!disable && (
        <span className="absolute bottom-1 right-0 block h-3 w-3 rounded-full border border-white bg-green-500" />
      )}
    </div>
  );
}
