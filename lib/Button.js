import React from 'react'

export default function Button({title, onClick }) {
  return (
    <button type="submit" onClick={onClick} className="w-full px-4 py-2 rounded-lg text-white text-sm border-none outline-none tracking-wide bg-blue">{title}</button>
  )
}
