import api from "./Api";

class HelpService {
  constructor() {}

  getAllHelps = async (userId = null, status = null) => {
    let url = "/help";

    if (userId && status) {
      url += `?id.except=${userId}&status=${status}`;
    }

    if (userId && status === null) {
      url += `?id.except=${userId}`;
    }

    const allHelps = await api.get(url);
    return allHelps.data;
  };

  async getNearHelp(coords) {
    const { longitude, latitude } = coords;
    const helps = await api.get(
      `/Help?near=true&coords=${longitude},${latitude}`
    );
    return helps.data;
  }

  getAllHelpForCategory() {}
  getAllHelpForUser() {}
  getAllHelpForHelper() {}

  async createHelp(title, categoryId, description) {
    const createdHelpResponse = await api.post("/help", {
      title,
      categoryId,
      description,
      ownerId: "5e8e4e19c2ebbc0026761416",
    });
    return createdHelpResponse;
  }

  deleteHelp() {}
}

const helpService = new HelpService();
Object.freeze(helpService);
export default helpService;
