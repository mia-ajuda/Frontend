import api from "../services/Api";

export default class HelpService {
  constructor() {}

  getAllHelp() {}

  getAllHelpForCategory() {}
  getAllHelpForUser() {}
  getAllHelpForHelper() {}

  createHelp() {}

  deleteHelp() {}
}

const helpService = new HelpService();
Object.freeze(helpService);

export default helpService;
