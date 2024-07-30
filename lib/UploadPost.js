"use client";
import React, { useState } from "react";
import Button from "./Button";
import { IoCloudUploadOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import axios from 'axios';
import CurrentUser from "./CurrentUser";

export default function UploadPost({ handleClose }) {
  const [preview, setPreview] = useState(null);
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  const  {currentUser} = CurrentUser();
  // console.log(currentUser, 'current user');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    } else {
      alert('Please select a valid image file (PNG, JPG, SVG, WEBP)');
    }
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('text', text);
    formData.append('image', image);
    formData.append('owner', currentUser?.id);

    try {
      const backendApi = process.env.NEXT_PUBLIC_BACKEND_API;
      const response = await axios.post(`${backendApi}/api/v1/post`, formData,);

      if (response.status === 200) {
        console.log('Post created successfully:', response.data);
        handleClose();
      } else {
        console.error('Error creating post:', response.data);
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="w-96 mx-auto bg-white shadow-lg rounded-lg p-6">
      <div className="flex items-center pb-3">
        <div className="flex-1">
          <h3 className="text-gray-800 text-xl text-center font-bold">
            Create a new Post
          </h3>
        </div>
      </div>

      <form onSubmit={handleUpload}>
        <div>
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Your message
          </label>
          <textarea
            onChange={handleTextChange}
            value={text}
            rows={2}
            className="block my-2 custom-scrollbar p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg focus:outline-none focus:border-none"
            placeholder="What is on your mind ..."
          />
        </div>

        {preview ? (
          <div className="relative">
            <img
              src={preview}
              alt="File Preview"
              className="mt-2 w-full h-52 object-contain"
            />
            <RxCross2
              onClick={() => setPreview(null)}
              className="absolute top-1 right-4 text-2xl"
            />
          </div>
        ) : (
          <label
            htmlFor="uploadFile1"
            className="bg-white text-gray-500 text-base rounded max-w-md h-52 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed mx-auto"
          >
            <IoCloudUploadOutline />
            Upload file
            <input
              id="uploadFile1"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            <p className="text-gray-400 mt-2">PNG, JPG, SVG</p>
          </label>
        )}

        <div className="flex justify-between gap-4 mt-6">
          <Button title="Cancel" onClick={handleClose} />
          <Button title="Post" onClick={handleUpload} />
        </div>
      </form>
    </div>
  );
}
