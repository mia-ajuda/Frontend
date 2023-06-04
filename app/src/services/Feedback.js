import api from '../services/Api';

class FeedbackService {
    async createFeedback(sender, receiver, message) {
        const response = await api.post('/feedback', {
            sender,
            receiver,
            message,
        });
        return response.data;
    }

    async getFeedbackByReceiverId(receiver) {
        const response = await api.get(`/feedback/${receiver}`);
        return response.data;
    }
}

const feedbackService = new FeedbackService();
Object.freeze(feedbackService);

export default feedbackService;
