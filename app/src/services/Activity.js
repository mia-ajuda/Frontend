import api from '../services/Api';

class ActivityService {
    async getActivityList(id, coords, categoryId, activityId) {
        const { longitude, latitude } = coords;
        const queryParams = new URLSearchParams({
            id,
            coords: `${longitude},${latitude}`,
            ...(categoryId && { categoryId }),
            ...(activityId && { activityId }),
        });
        const url = `/activity/list?${queryParams.toString()}`;

        const activityList = await api.get(url);
        return activityList.data;
    }
}

const activityService = new ActivityService();
Object.freeze(activityService);

export default activityService;
