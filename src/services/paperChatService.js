import apiService from './apiService.js';

// Paper chat related API functions
const paperChatService = {
    /**
     * Send a chat message for a specific paper and get AI response
     * @param {String} paperId - The ID of the paper to chat about
     * @param {String} message - The user's message
     * @returns {Promise<Object>} - The AI response
     */
    sendChatMessage: async (paperId, message) => {
        try {
            const response = await apiService.post(`/paper-chat/${paperId}/chat`, { message });
            return response.data;
        } catch (error) {
            console.error('Error sending chat message:', error);
            throw error;
        }
    },

    /**
     * Get chat history for a specific paper
     * @param {String} paperId - The ID of the paper
     * @param {Object} params - Optional parameters like limit, page
     * @returns {Promise<Array>} - Chat history for the paper
     */
    getChatHistory: async (paperId, params = {}) => {
        try {
            const response = await apiService.get(`/paper-chat/${paperId}/chat/history`, { params });
            return response.data;
        } catch (error) {
            console.error('Error fetching chat history:', error);
            throw error;
        }
    },

    /**
     * Get details about a specific paper
     * @param {String} paperId - The ID of the paper
     * @returns {Promise<Object>} - Paper details
     */
    getPaperDetails: async (paperId) => {
        try {
            const response = await apiService.get(`/paper-chat/${paperId}/details`);
            return response.data;
        } catch (error) {
            console.error('Error fetching paper details:', error);
            throw error;
        }
    },

    /**
     * Add a system message to the chat
     * @param {String} paperId - The ID of the paper
     * @param {String} systemMessage - The system message to add
     * @returns {Promise<Object>} - Response after adding system message
     */
    addSystemMessage: async (paperId, systemMessage) => {
        try {
            const response = await apiService.post(`/paper-chat/${paperId}/system`, { systemMessage });
            return response.data;
        } catch (error) {
            console.error('Error adding system message:', error);
            throw error;
        }
    },

    /**
     * Get a response from the AI based on the paper content
     * @param {String} paperId - The ID of the paper
     * @param {String} question - The question to ask about the paper
     * @returns {Promise<Object>} - The AI response
     */
    getChatResponse: async (paperId, question) => {
        try {
            const response = await apiService.post(`/papers/${paperId}/chat`, { question });
            return response.data;
        } catch (error) {
            console.error('Error getting chat response:', error);
            throw error;
        }
    },

    /**
     * Save a chat message
     * @param {String} paperId - The ID of the paper
     * @param {Object} message - The message object to save
     * @returns {Promise<Object>} - The saved message
     */
    saveChatMessage: async (paperId, message) => {
        try {
            const response = await apiService.post(`/papers/${paperId}/chat/message`, message);
            return response.data;
        } catch (error) {
            console.error('Error saving chat message:', error);
            throw error;
        }
    }
};

export default paperChatService;