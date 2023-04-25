import api from '../services/Api';

class BadgeService {
    async getUserBadges(userId) {
        const response = await api.get(`/badges?userId=${userId}`);
        return response.data;
    }
    async getBadgesHistory(userId) {
        const response = await api.get(`/badges/history?userId=${userId}`);
        return response.data;
    }
    async increaseUserBadge(userId, category) {
        const response = await api.post('/badges/', { userId, category });
        return response.data;
    }
}

const badgeService = new BadgeService();
Object.freeze(badgeService);

export default badgeService;
