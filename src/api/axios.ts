import axios from 'axios';

const instance = axios.create({
  // baseURL: 'http://localhost:5100/api',
  // baseURL: 'http://localhost:5081',
  // baseURL: 'https://barker-server-hilitpqc9-briankarlsayen.vercel.app',
  baseURL: 'https://openai-server-eight.vercel.app',
  // baseURL: "https://SmoggyFrighteningEnvironments.blu3fire89.repl.co",
  // baseURL: "https://openai-server.onrender.com",
});

export default instance;
