import api from './Api';

class CampaignService {
    constructor() {}

    async getNearCampaign(coords, id) {
        const { longitude, latitude } = coords;
        const campaign = await api.get(
            `/campaign?id.except=${id}&near=true&coords=${longitude},${latitude}`,
        );
        return campaign.data;
    }

    async getCampaignMultipleStatus(userId, status) {
        const url = `/campaign/listbyStatus/${userId}?statusList=${status}`;
        const campaign = await api.get(url);
        return campaign.data;
    }

    async createCampaign(title, categoryId, description, ownerId, location) {
        const data = {
            title,
            categoryId,
            description,
            ownerId,
            location,
        };
        const createdCampaignResponse = await api.post('/campaign', data);
        return createdCampaignResponse.data;
    }

    async finishCampaign(campaignId) {
        const url = `/campaign/${campaignId}`;
        await api.put(url);
        return true;
    }

    async deleteCampaign(campaignId) {
        const deleteCampaign = await api.delete(`/campaign/${campaignId}`);
        return deleteCampaign;
    }

    async getCampaignById(campaignId) {
        const url = `/campaign/${campaignId}`;
        const campaign = await api.get(url);
        return campaign.data;
    }
}

const campaignService = new CampaignService();
Object.freeze(campaignService);
export default campaignService;
