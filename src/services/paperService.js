import apiService from './apiService.js';

// Paper related API functions
const paperService = {
    /**
     * Upload a new paper
     * @param {File} file - The paper file to upload
     * @param {Object} metadata - Additional metadata for the paper
     * @returns {Promise<Object>} - The uploaded paper details
     */
    uploadPaper: async (file, metadata = {}) => {
        try {
            const formData = new FormData();
            formData.append('file', file);

            // Add any metadata fields to the form data
            Object.entries(metadata).forEach(([key, value]) => {
                formData.append(key, value);
            });

            const response = await apiService.post('/papers/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            return response.data;
        } catch (error) {
            console.error('Error uploading paper:', error);
            throw error;
        }
    },

    /**
     * Get all papers for the current user
     * @param {Object} params - Query parameters for filtering papers
     * @returns {Promise<Array>} - List of papers
     */
    getPapers: async (params = {}) => {
        try {
            const response = await apiService.get('/papers', { params });
            return response.data;
        } catch (error) {
            console.error('Error fetching papers:', error);
            throw error;
        }
    },

    /**
     * Get a specific paper by ID
     * @param {String} id - The ID of the paper to retrieve
     * @returns {Promise<Object>} - The paper details
     */
    getPaperById: async (id) => {
        try {
            const response = await apiService.get(`/papers/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching paper:', error);
            throw error;
        }
    },

    /**
     * Delete a paper by ID
     * @param {String} id - The ID of the paper to delete
     * @returns {Promise<Object>} - The deletion response
     */
    deletePaper: async (id) => {
        try {
            const response = await apiService.delete(`/papers/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting paper:', error);
            throw error;
        }
    }
};

export default paperService;