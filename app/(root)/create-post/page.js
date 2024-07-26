import React from 'react'
import { FiUploadCloud } from "react-icons/fi";

export default function createPost() {
  return (
    <div>
       <div className="w-full h-full ">
  <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 relative">
    <div className="flex items-center pb-3 border-b border-gray-200">
      <div className="flex-1">
        <h3 className="text-gray-800 text-xl font-bold">Upload File</h3>
        <p className="text-gray-600 text-xs mt-1">Upload file to this project</p>
      </div>
      
    </div>
    <div>
  

<label htmlFor="dropzone-file" className="flex flex-col items-center w-full max-w-lg p-5 mx-auto mt-2 text-center bg-white border-2 border-gray-300 border-dashed cursor-pointer dark:bg-gray-900 dark:border-gray-700 rounded-xl">
    <FiUploadCloud className=" text-xl"/>
  
    <h2 className="mt-1 font-medium tracking-wide text-gray-700 dark:text-gray-200">Payment File</h2>
    <p className="mt-2 text-xs tracking-wide text-gray-500 dark:text-gray-400">Upload or darg &amp; drop your file SVG, PNG, JPG or GIF. </p>
    <input id="dropzone-file" type="file" className="hidden" />
  </label>

</div>

    <div className="border-t border-gray-200 pt-6 flex justify-between gap-4 mt-6">
      <button type="button" className="w-full px-4 py-2 rounded-lg text-white text-sm border-none outline-none tracking-wide bg-[#2563eb] ">Cancel</button>
      <button type="button" className="w-full px-4 py-2 rounded-lg text-white text-sm border-none outline-none tracking-wide bg-[#2563eb] ">Import</button>
      
    </div>
  </div>
</div>

    </div>
  )
}
