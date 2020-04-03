export default class Help {
  constructor(
    id,
    title,
    description,
    status,
    possibleHelpers,
    categoryId,
    ownerId,
    helperId,
    creationDate,
    finishedDate
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = status;
    this.possibleHelpers = possibleHelpers;
    this.categoryId = categoryId;
    this.ownerId = ownerId;
    this.helperId = helperId;
    this.creationDate = creationDate;
    this.finishedDate = finishedDate;
  }

  getAllHelp() {}

  getAllHelpForCategory() {}
  getAllHelpForUser() {}
  getAllHelpForHelper() {}

  createHelp() {}

  deleteHelp() {}
}
