import axios from 'axios';

const api = axios.create({
  baseURL: 'https://geo-data-mern.vercel.app/',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;