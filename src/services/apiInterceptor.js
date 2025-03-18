import store from '../redux/store';
import apiService from './apiService';
import { logoutUser } from '../redux/slices/authSlice';

// Request interceptor - Add auth token to requests
apiService.interceptors.request.use(
    (config) => {
        const state = store.getState();
        const token = state.auth.token;

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor - Handle common errors
apiService.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle 401 Unauthorized errors (token expired, etc.)
        if (error.response && error.response.status === 401) {
            // Dispatch logout action to clear auth state
            store.dispatch(logoutUser());
        }

        return Promise.reject(error);
    }
);

// Export the configured instance
export default apiService;