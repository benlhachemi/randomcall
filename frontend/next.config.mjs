/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BACKEND_ENDPOINT: 'ws://127.0.0.1:5555',
    APP_ID: 'CHANGE ME',
    SERVER_SECRET: 'CHANGE ME'
  }
};

export default nextConfig;
