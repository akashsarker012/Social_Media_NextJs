
const hostnames = [
  'readymadeui.com',
  "i.pravatar.cc",
]
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: hostnames,
    },
  }


export default nextConfig;
