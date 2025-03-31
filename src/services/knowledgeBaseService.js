import apiService from './apiService.js';

// Knowledge base related API functions
const knowledgeBaseService = {
    /**
     * Get knowledge base entry by paper ID
     * @param {String} paperId - The ID of the paper to retrieve knowledge base for
     * @returns {Promise<Object>} - The knowledge base entry for the paper
     */
    getKnowledgeBaseByPaperId: async (paperId) => {
        try {
            const response = await apiService.get(`/knowledge-base/${paperId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching knowledge base entry:', error);
            throw error;
        }
    },

    /**
     * Get all knowledge base entries
     * @returns {Promise<Array>} - List of all knowledge base entries
     */
    getAllKnowledgeBaseEntries: async () => {
        try {
            const response = await apiService.get('/knowledge-base');
            return response.data;
        } catch (error) {
            console.error('Error fetching knowledge base entries:', error);
            throw error;
        }
    }
};

export default knowledgeBaseService;