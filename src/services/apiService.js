import axios from 'axios';

const apiService = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
});

export default apiService;
