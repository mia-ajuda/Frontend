import api from "./Api";
import getHelpDistance from "../utils/helpDistance";

class HelpService {
  constructor() {}

  getAllHelp() {}

  async getNearHelp(coords) {
    const { longitude, latitude } = coords;

    const helps = await api.get(
      `/Help?near=true&coords=${longitude},${latitude}`
    );

    return helps.data;
  }

  async getAllHelpForCategory(coords, categoryId) {
    const { longitude, latitude } = coords;
    const url = categoryId
      ? `/Help?near=true&coords=${longitude},${latitude}&categoryId=${categoryId}`
      : `/Help?near=true&coords=${longitude},${latitude}`;

    const helps = await api.get(url);

    return helps.data;
  }
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
