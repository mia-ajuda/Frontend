import api from '../services/Api';

class FeedbackService {
    async createFeedback(senderId, receiverId, body) {
        const response = await api.post('/feedback', {
            senderId,
            receiverId,
            body,
        });
        return response.data;
    }

    async getFeedbackByReceiverId(receiverId) {
        const response = await api.get(`/feedback/${receiverId}`);
        return response.data;
    }
}

const feedbackService = new FeedbackService();
Object.freeze(feedbackService);

export default feedbackService;
