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

  createHelp() {}

  deleteHelp() {}
}

const helpService = new HelpService();
Object.freeze(helpService);

export default helpService;
