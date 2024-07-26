
const hostnames = [
  'readymadeui.com',
  "i.pravatar.cc",
  "res.cloudinary.com"
]
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: hostnames,
    },
  }


export default nextConfig;
