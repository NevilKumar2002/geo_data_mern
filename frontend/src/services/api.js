import axios from 'axios';

const api = axios.create({
  baseURL: 'https://geo-data-mern-nevils-projects-7b815f1c.vercel.app/',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;