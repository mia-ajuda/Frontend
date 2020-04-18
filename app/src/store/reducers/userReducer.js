import actions from "../actions";

export const userReducer = (state, action) => {
  switch (action.type) {
    case actions.user.storeUserInfo:
      return {
        isLoading: false,
        data: action.data,
      };
    case actions.user.removeUserInfo:
      return {
        isLoading: false,
        data: null,
      };

    default:
      return state;
  }
};
