import axios from 'axios';

const API = axios.create({
  baseURL: 'html://localhost:3000'
});

export default API;
