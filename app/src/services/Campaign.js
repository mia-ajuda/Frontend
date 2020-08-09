import api from './Api';

class CampaignService {
    constructor() {}

    async getAllCampaigns(userId = null, status = null) {
        let url = '/campaign';
        let id = userId;
        if (status) {
            url += `?id.except=${id}&status=${status}`;
        } else {
            url += `?id.except=${id}`;
        }
        console.log(url);

        const allCampaigns = await api.get(url);
        return allCampaigns.data;
    }

    async getNearCampaign(coords, id) {
        const { longitude, latitude } = coords;
        const campaign = await api.get(
            `/campaign?id.except=${id}&near=true&coords=${longitude},${latitude}`,
        );
        return campaign.data;
    }

    async getAllCampaignForCategory(coords, categoryId, id) {
        const { longitude, latitude } = coords;
        const url = `/help?id.except=${id}&near=true&coords=${longitude},${latitude}&categoryId=${categoryId}`;

        const helps = await api.get(url);

        return helps.data;
    }

    async getCampaignMultipleStatus(userId, status, helper) {
        const url = `/help/listbyStatus/${userId}?statusList=${status}&helper=${helper}`;
        const helps = await api.get(url);
        return helps.data;
    }

    async createCampaign(title, categoryId, description, ownerId) {
        const data = {
            title,
            categoryId,
            description,
            ownerId,
        };
        const createdCampaignResponse = await api.post('/campaign', data);
        return createdCampaignResponse.data;
    }

    async deleteCampaign(campaignId) {
        const deleteCampaign = await api.delete(`/campaign/${campaignId}`);
        return deleteCampaign;
    }

    async finishCampaignByOwner(campaignId, ownerId) {
        const url = `/campaign/ownerConfirmation/${campaignId}/${ownerId}`;
        await api.put(url);
        return true;
    }

    async getAllUserCampaigns(userId) {
        const url = `/campaign?id=${userId}`;
        const helps = await api.get(url);
        return helps;
    }
}

const campaignService = new CampaignService();
Object.freeze(campaignService);
export default campaignService;
