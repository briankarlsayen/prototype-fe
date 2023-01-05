import axios from 'axios';

const instance = axios.create({
    baseURL: "https://SmoggyFrighteningEnvironments.blu3fire89.repl.co",
    // baseURL: "https://openai-server.onrender.com",
});

export default instance;