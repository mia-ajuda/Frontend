import api from "./Api";
import firebaseAuth from "./firebaseAuth";

class HelpService {
  constructor() { }

  getAllHelps = async (userId = null, status = null, accessToken) => {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    let url = "/help";
    let id = userId;

    if (status) {
      url += `?id.except=${id}&status=${status}`;
    } else {
      url += `?id.except=${id}`;
    }

    const allHelps = await api.get(url, { headers });
    return allHelps.data;
  };

  async getNearHelp(coords, id, accessToken) {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const { longitude, latitude } = coords;
    const helps = await api.get(
      `/help?id.except=${id}&near=true&coords=${longitude},${latitude}`,
      { headers }
    );

    return helps.data;
  }

  async getAllHelpForCategory(coords, categoryId, id, accessToken) {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const { longitude, latitude } = coords;
    const url = `/help?id.except=${id}&near=true&coords=${longitude},${latitude}&categoryId=${categoryId}`;

    const helps = await api.get(url, { headers });

    return helps.data;
  }

  async getAllHelpForUser(userId, status, accessToken) {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const url = status
      ? `/Help?id=${userId}&status=${status}`
      : `/Help?id=${userId};`;

    const helps = await api.get(url, { headers });

    return helps.data;
  }
  getAllHelpForUser() { }
  getAllHelpForHelper() { }

  async createHelp(title, categoryId, description, accessToken, ownerId) {
    const data = {
      title,
      categoryId,
      description,
      ownerId,
    };
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    const createdHelpResponse = await api.post("/help", data, { headers });
    return createdHelpResponse.data;
  }

  async deleteHelp(helpId, accessToken) {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    const deleteHelp = await api.delete(`/help/${helpId}`, { headers });
    return deleteHelp;
  }

  async chooseHelp(idHelp, idHelper, accessToken) {
    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const url = `/help/possibleHelpers/${idHelp}/${idHelper}`;
      await api.put(url, { headers });
    } catch (error) {
      console.log(error.response);
    }
  }
}

const helpService = new HelpService();
Object.freeze(helpService);
export default helpService;
