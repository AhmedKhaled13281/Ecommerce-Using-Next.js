/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['lh3.googleusercontent.com' , 'avatars.githubusercontent.com' , 'firebasestorage.googleapis.com'],
  },
  env: {
    GOOGLE_ID : process.env.GOOGLE_ID,
    GOOGLE_SECRET : process.env.GOOGLE_SECRET,
    GITHUB_ID : process.env.GITHUB_ID,
    GITHUB_SECRET : process.env.GITHUB_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    MONGODB_URI: process.env.MONGODB_URI,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET
  }
};

module.exports = nextConfig;

