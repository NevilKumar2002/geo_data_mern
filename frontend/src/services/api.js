import axios from 'axios';

const api = axios.create({

  
  baseURL: 'https://geo-data-mern-3.onrender.com',

  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
