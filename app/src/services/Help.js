import api from "./Api";

class HelpService {
  constructor() {}

  getAllHelps = async (status = null, userId = null) => {
    let url = "/help";
    let id = userId;

    if (status) {
      url += `?id.except=${id}&status=${status}`;
    } else {
      url += `?id.except=${id}`;
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
