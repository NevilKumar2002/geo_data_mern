import axios from 'axios';

const api = axios.create({
<<<<<<< HEAD
  baseURL: 'http://localhost:8007',
=======
  baseURL: 'https://geo-data-mern.onrender.com',
>>>>>>> c2d6a0ccf368996613f5e94c08cbbe0145b8fbdd
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
