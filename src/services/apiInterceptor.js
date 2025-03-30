import store from '../redux/store';
import apiService from './apiService';
import { logout, refreshToken } from '../redux/slices/authSlice';

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

// Request interceptor - Add auth token to requests
apiService.interceptors.request.use(
    (config) => {
        const state = store.getState();
        const accessToken = state.auth.accessToken;

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor - Handle token refresh
apiService.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // If the error is due to an invalid token and we haven't tried refreshing yet
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            // If we're not already refreshing a token
            if (!isRefreshing) {
                isRefreshing = true;
                originalRequest._retry = true;

                try {
                    // Try to refresh the token
                    await store.dispatch(refreshToken());
                    const newState = store.getState();

                    // If we got a new token
                    if (newState.auth.accessToken) {
                        // Update the authorization header
                        originalRequest.headers.Authorization = `Bearer ${newState.auth.accessToken}`;

                        // Process any other requests that were waiting
                        processQueue(null, newState.auth.accessToken);

                        // Try the original request again
                        return apiService(originalRequest);
                    } else {
                        // If refresh failed, logout
                        store.dispatch(logout());
                        processQueue(new Error('Token refresh failed'));
                        return Promise.reject(error);
                    }
                } catch (refreshError) {
                    // If refreshing fails, logout and reject all pending requests
                    store.dispatch(logout());
                    processQueue(refreshError);
                    return Promise.reject(refreshError);
                } finally {
                    isRefreshing = false;
                }
            } else {
                // If we're already refreshing, wait for that to complete
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then(token => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return apiService(originalRequest);
                    })
                    .catch(err => {
                        return Promise.reject(err);
                    });
            }
        }

        return Promise.reject(error);
    }
);

// Export the configured instance
export default apiService;