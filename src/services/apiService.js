import axios from 'axios';

const apiService = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
    withCredentials: true, // Enable cookies for all requests by default
    headers: {
        'Content-Type': 'application/json'
    },
});

export default apiService;