import actions from "../actions";

const helpReducer = (state, action) => {
  switch (action.type) {
    case actions.help.addHelp:
      return action.helps;
    default:
      return state;
  }
};

export default helpReducer;
