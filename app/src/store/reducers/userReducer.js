import user from "../../models/User";
import { actionGetUserData } from "../actions";

export const userReducer = (state, action) => {
  switch (action.type) {
    case actionGetUserData:
      return action.data;

    default:
      return state;
  }
};
