import user from "../../models/User";
import { actionGetUserData } from "../actions";

export const userReducer = (state, action) => {
  switch (action.type) {
    case actionGetUserData:
      console.log("recuder");
      return user.getUserData();
      break;

    default:
      return state;
      break;
  }
};
