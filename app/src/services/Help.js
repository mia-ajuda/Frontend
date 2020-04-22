import api from "./Api";
import firebaseAuth from "./firebaseAuth";

class HelpService {
  constructor() { }

  getAllHelps = async (userId = null, status = null) => {
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

  async getNearHelp(coords, id) {
    const { longitude, latitude } = coords;

    const helps = await api.get(
      `/help?id.except=${id}&near=true&coords=${longitude},${latitude}`
    );
    return helps.data;
  }

  async getAllHelpForCategory(coords, categoryId, id) {
    const { longitude, latitude } = coords;
    const url = `/help?id.except=${id}&near=true&coords=${longitude},${latitude}&categoryId=${categoryId}`;

    const helps = await api.get(url);

    return helps.data;
  }
  getAllHelpForUser() { }
  getAllHelpForHelper() { }

  // async createHelp(title, categoryId, description) {

  //   requestUserData = async (token) => {
  //     const user = await api.get(`/user`, {
  //       headers: {
  //         authorization: `Bearer ${token}`,
  //       },
  //     });
  //     return user.data;
  //   }

  //   const idTokenUser = await firebaseAuth.auth().currentUser.getIdToken();
  //   const userInfo = await requestUserData(idTokenUser);

  //   const createdHelpResponse = await api.post("/help", {
  //     title,
  //     categoryId,
  //     description,
  //     ownerId: userInfo._id,
  //   });
  //   return createdHelpResponse;
  // }
  async createHelp(title, categoryId, description, accessToken, ownerId) {
    const data = {
      title,
      categoryId,
      description,
      ownerId,
    };
    const headers = {
      Authorization: accessToken,
    };
    const createdHelpResponse = await api.post("/help", data, { headers });
    console.log(createdHelpResponse.data);
    return createdHelpResponse.data;
  }
  
  deleteHelp() { }
}

  const helpService = new HelpService();
  Object.freeze(helpService);
  export default helpService;
