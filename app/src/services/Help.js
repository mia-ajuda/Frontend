import api from './Api';

class HelpService {
    constructor() {}

    async getAllHelps(userId = null, status = null) {
        let url = '/help';
        let id = userId;

        if (status) {
            url += `?id.except=${id}&status=${status}`;
        } else {
            url += `?id.except=${id}`;
        }

        const allHelps = await api.get(url);
        return allHelps.data;
    }

    async getNearHelp(coords, id) {
        const { longitude, latitude } = coords;
        const helps = await api.get(
            `/help?id.except=${id}&near=true&coords=${longitude},${latitude}`,
        );
        return helps.data;
    }

    async getAllHelpForCategory(coords, categoryId, id) {
        const { longitude, latitude } = coords;
        const url = `/help?id.except=${id}&near=true&coords=${longitude},${latitude}&categoryId=${categoryId}`;

        const helps = await api.get(url);

        return helps.data;
    }

    async getHelpMultipleStatus(userId, status, helper) {
        const url = `/help/listbyStatus/${userId}?statusList=${status}&helper=${helper}`;
        const helps = await api.get(url);
        return helps.data;
    }

    async createHelp(title, categoryId, description, ownerId) {
        const data = {
            title,
            categoryId,
            description,
            ownerId,
        };

        const createdHelpResponse = await api.post('/help', data);
        return createdHelpResponse.data;
    }

    async deleteHelp(helpId) {
        const deleteHelp = await api.delete(`/help/${helpId}`);
        return deleteHelp;
    }

    async chooseHelp(idHelp, idHelper) {
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

    async finishHelpByOwner(helpId, ownerId) {
        const url = `/help/ownerConfirmation/${helpId}/${ownerId}`;
        await api.put(url);
        return true;
    }
}

const helpService = new HelpService();
Object.freeze(helpService);
export default helpService;
