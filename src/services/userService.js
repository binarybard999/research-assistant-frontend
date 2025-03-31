import apiService from './apiService.js';

// User related API functions
const userService = {
    /**
     * Register a new user
     * @param {Object} userData - User registration data (email, password, etc.)
     * @returns {Promise<Object>} - The registered user data and tokens
     */
    register: async (userData) => {
        try {
            const response = await apiService.post('/users/register', userData);
            return response.data;
        } catch (error) {
            console.error('Error registering user:', error);
            throw error;
        }
    },

    /**
     * Login a user
     * @param {Object} credentials - Login credentials (email, password)
     * @returns {Promise<Object>} - User data and authentication tokens
     */
    login: async (credentials) => {
        try {
            const response = await apiService.post('/users/login', credentials);
            return response.data;
        } catch (error) {
            console.error('Error logging in:', error);
            throw error;
        }
    },

    /**
     * Logout the current user
     * @returns {Promise<Object>} - Logout confirmation
     */
    logout: async () => {
        try {
            const response = await apiService.post('/users/logout');
            return response.data;
        } catch (error) {
            console.error('Error logging out:', error);
            throw error;
        }
    },

    /**
     * Refresh the access token using refresh token
     * @returns {Promise<Object>} - New access token
     */
    refreshAccessToken: async () => {
        try {
            const response = await apiService.post('/users/refresh-token');
            return response.data;
        } catch (error) {
            console.error('Error refreshing token:', error);
            throw error;
        }
    },

    /**
     * Get current logged-in user data
     * @returns {Promise<Object>} - Current user data
     */
    getCurrentUser: async () => {
        try {
            const response = await apiService.get('/users/current-user');
            return response.data;
        } catch (error) {
            console.error('Error fetching current user:', error);
            throw error;
        }
    }
};

export default userService;