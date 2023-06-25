import api from '../services/Api';

class ActivityService {
    constructor() {}

    async getActivityList(id, coords, categoryId, activityId) {
        const { longitude, latitude } = coords;
        const url =
            `/activity/list?id=${id}&coords=${longitude},${latitude}` +
            (categoryId ? `&categoryId=${categoryId}` : '') +
            (activityId ? `&activityId=${activityId}` : '');

        const activityList = await api.get(url);
        return activityList.data;
    }
}

const activityService = new ActivityService();
Object.freeze(activityService);

export default activityService;
