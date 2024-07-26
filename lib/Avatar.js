import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Avatar({ imageURL, userId, width, height, disable , }) {
  return (
  <div className="cursor-pointer inline-block relative">
    <Image src={imageURL} width={ width ? width : 60} height={height ? height : 60} className="rounded-full border-2 border-blue-600 p-0.5" alt="profile" />
    {
      !disable &&
    <span className="h-3 w-3 rounded-full border border-white bg-green-500 block absolute bottom-1 right-0" />
    }
  </div>

  );
}
