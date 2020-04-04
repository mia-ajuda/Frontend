import api from "./Api";

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

  getAllHelpForCategory() {}
  getAllHelpForUser() {}
  getAllHelpForHelper() {}

  createHelp() {}

  deleteHelp() {}
}

const helpService = new HelpService();
Object.freeze(helpService);

export default helpService;
