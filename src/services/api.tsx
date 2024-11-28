// src/services/api.tsx
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8080/api/exchange',
});

export default API;
