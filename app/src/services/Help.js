import api from "./Api";

class HelpService {
  constructor() {}

  async getAllHelps(userId = null, status = null) {
    let url = "/help";
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
    `/help?id.except=${id}&near=true&coords=${longitude},${latitude}`
    );
      return helps.data;
  }

  async getAllHelpForCategory(coords, categoryId, id) {
    const { longitude, latitude } = coords;
    const url = `/help?id.except=${id}&near=true&coords=${longitude},${latitude}&categoryId=${categoryId}`;

    const helps = await api.get(url);

    return helps.data;
  }

  async getAllHelpForUser(userId, status) {
    const url = status
      ? `/help?id=${userId}&status=${status}`
      : `/help?id=${userId};`;

    const helps = await api.get(url);

    return helps.data;
  }

  async getAllHelpForHelper(userId, status) {
    const url = status
      ? `/help?id.helper=${userId}&status=${status}`
      : `/help?id.helper=${userId};`;

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

    const createdHelpResponse = await api.post("/help", data);
    return createdHelpResponse.data;
  }

  async deleteHelp(helpId) {
    const deleteHelp = await api.delete(`/help/${helpId}`);
    return deleteHelp;
  }

  async chooseHelp(idHelp, idHelper) {
    try {
      const url = `/help/possibleHelpers/${idHelp}/${idHelper}`;
      await api.put(url);
    } catch (error) {
      console.log(error.response);
      throw error;
    }
  }

  async finishHelpByHelper(idHelp, idHelper) {
    try {

      const url = `/help/helperConfirmation/${idHelp}/${idHelper}`;
      await api.put(url);
    } catch (error) {
      console.log(error.response);
      throw error;
    }
  }
}

const helpService = new HelpService();
Object.freeze(helpService);
export default helpService;
