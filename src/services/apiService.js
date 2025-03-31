import axios from 'axios';

// Centralized API configuration
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
export const API_VERSION = '/api/v1';

const apiService = axios.create({
    baseURL: `${API_URL}${API_VERSION}`,
    withCredentials: true, // Enable cookies for all requests by default
    headers: {
        'Content-Type': 'application/json'
    },
});

export default apiService;