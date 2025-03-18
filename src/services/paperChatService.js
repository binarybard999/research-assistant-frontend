import apiService from './apiService';

class PaperChatService {
    // Method to get a response from the AI based on the paper content
    async getChatResponse(paperId, question) {
        try {
            // In a real implementation, this would call an endpoint that processes the question
            // using the paper's content through an LLM
            const response = await apiService.post(`/api/v1/papers/${paperId}/chat`, {
                question
            });
            return response.data;
        } catch (error) {
            console.error('Error getting chat response:', error);
            throw error;
        }
    }

    // Method to retrieve chat history for a paper
    async getChatHistory(paperId) {
        try {
            const response = await apiService.get(`/api/v1/papers/${paperId}/chat/history`);
            return response.data;
        } catch (error) {
            console.error('Error getting chat history:', error);
            throw error;
        }
    }

    // Method to save a chat message
    async saveChatMessage(paperId, message) {
        try {
            const response = await apiService.post(`/api/v1/papers/${paperId}/chat/message`, message);
            return response.data;
        } catch (error) {
            console.error('Error saving chat message:', error);
            throw error;
        }
    }
}

export default new PaperChatService();