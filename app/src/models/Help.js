import api from "../services/Api";

export default class Help {
  _id;
  _title;
  _description;
  _status;
  _possibleHelpers;
  _categoryId;
  _ownerId;
  _helperId;
  _creationDate;
  _finishedDate;

  constructor() {}

  getAllHelp() {}

  getAllHelpForCategory() {}
  getAllHelpForUser() {}
  getAllHelpForHelper() {}

  createHelp() {}

  deleteHelp() {}
}

const help = new Help();
Object.freeze(help);

export default help;
