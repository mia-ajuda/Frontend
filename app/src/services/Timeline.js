import api from '../services/Api';

class TimelineService {
    async getTimelineByUserId(userId) {
        const response = await api.get(`/timeline?userId=${userId}`);
        return response.data;
    }
}

const timelineService = new TimelineService();
Object.freeze(timelineService);

export default timelineService;
