import actions from "../actions";

export const userReducer = (state, action) => {
  switch (action.type) {
    case actions.user.getUserData:
      return action.data;

    default:
      return state;
  }
};
