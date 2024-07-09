import axios from 'axios';

const api = axios.create({
  baseURL: 'https://geo-data-mern-iak2.vercel.app',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
