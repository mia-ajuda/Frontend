import actions from "../actions";

export const userReducer = (state, action) => {
  switch (action.type) {
    case actions.user.auth:
      return {
        isLoading: false,
        data: action.data,
      };

    default:
      return state;
  }
};
