import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.github.com',
});

api.defaults.headers.common['Authorization'] = process.env.REACT_APP_API_KEY;

export default api;
