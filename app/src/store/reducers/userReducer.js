import user from "../../models/User";
import { actionGetUserData } from "../actions";

export const userReducer = async (state, action) => {
  switch (action.type) {
    case actionGetUserData:
      console.log("recuder");
      return await user.getUserData();
      break;

    default:
      return state;
      break;
  }
};
