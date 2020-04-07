import api from "./Api";

class HelpService {
  constructor() {}

  getAllHelps = async (userId = null, status = null) => {
    let url = "/help";

    if (userId && status) {
      url += `?id.except=${userId}&status=${status}`;
    }

    if (userId && status === null) {
      url += `?id=${userId}`;
    }

    const allHelps = await api.get(url);
    return allHelps.data;
  };

  getAllHelpForCategory() {}
  getAllHelpForUser() {}
  getAllHelpForHelper() {}
  createHelp() {}
  deleteHelp() {}
}

const helpService = new HelpService();
Object.freeze(helpService);
export default helpService;
