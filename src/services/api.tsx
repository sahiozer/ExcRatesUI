// src/services/api.tsx
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8080/api/gold',
});

export default API; // Export the API instance
