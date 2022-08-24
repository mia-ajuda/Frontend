import api from './Api';

class HelpService {
    constructor() {}

    async getNearHelp(coords, id) {
        const { longitude, latitude } = coords;
        const helps = await api.get(
            `/help?id=${id}&coords=${longitude},${latitude}`,
        );
        return helps.data;
    }

    async getAllHelpForCategory(coords, categoryId, id) {
        const { longitude, latitude } = coords;
        const url = `/help?id=${id}&coords=${longitude},${latitude}&categoryId=${categoryId}`;

        const helps = await api.get(url);
        return helps.data;
    }

    async getHelpMultipleStatus(userId, status, helper) {
        const url = `/help/listbyStatus/${userId}?statusList=${status}&helper=${helper}`;
        const helps = await api.get(url);
        return helps.data;
    }

    async createHelpRequest(title, categoryId, description, ownerId, location) {
        const data = {
            title,
            categoryId,
            description,
            ownerId,
            location,
        };

        const createdHelpResponse = await api.post('/help', data);
        return createdHelpResponse.data;
    }
    async createHelpOffer(title, categoryId, description, ownerId, location) {
        const data = {
            title,
            categoryId,
            description,
            ownerId,
            location,
        };

        const createdHelpResponse = await api.post('/helpOffer', data);
        return createdHelpResponse.data;
    }

    async getHelpWithAggregationById(helpId) {
        const help = await api.get(`/help/aggregation/${helpId}`);
        return help.data;
    }

    async getHelpOfferWithAggregationById(offerId) {
        const help = await api.get(`/helpOffer/aggregation/${offerId}`);
        return help.data;
    }

    async listHelpOffer(userId, getOtherUsers) {
        const helpOfferList = await api.get(
            `/helpOffer/list/?userId=${userId}&getOtherUsers=${getOtherUsers}`,
        );
        return helpOfferList.data;
    }

    async listHelpOfferWithCategories(userId, categoryId) {
        const helpOfferList = await api.get(
            `/helpOffer/list?userId=${userId}&categoryId=${categoryId}`,
        );
        return helpOfferList.data;
    }

    async deleteHelp(helpRoute, helpId) {
        await api.delete(`/${helpRoute}/${helpId}`);
        return true;
    }

    async offerHelp(idHelp, idHelper) {
        const url = `/help/possibleHelpers/${idHelp}/${idHelper}`;
        await api.put(url);
        return true;
    }

    async finishHelpByHelper(idHelp, idHelper) {
        const url = `/help/helperConfirmation/${idHelp}/${idHelper}`;
        await api.put(url);
        return true;
    }

    async chooseHelper(idHelp, idHelper) {
        const url = `/help/chooseHelper/${idHelp}/${idHelper}`;
        await api.put(url);
        return true;
    }

    async chooseHelpedUsers(idHelpOffer, idHelped) {
        const url = `/helpOffer/chooseHelpedUsers/${idHelped}/${idHelpOffer}`;
        await api.put(url);
        return true;
    }

    async finishHelpByOwner(helpId, ownerId) {
        const url = `/help/ownerConfirmation/${helpId}/${ownerId}`;
        await api.put(url);
        return true;
    }

    async getHelpInfo(helpId) {
        const url = `/help/helpInfo/${helpId}`;
        const result = await api.get(url);
        return result.data;
    }

    async participateHelpOffer(helpOfferId, helpedId) {
        const url = `/helpOffer/possibleHelpedUsers/${helpedId}/${helpOfferId}`;
        await api.put(url);
        return true;
    }
}

const helpService = new HelpService();
Object.freeze(helpService);
export default helpService;
