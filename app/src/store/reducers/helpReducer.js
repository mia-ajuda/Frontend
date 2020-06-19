import actions from '../actions';

const helpReducer = (state, action) => {
  switch (action.type) {
    case actions.help.storeList:
      return action.helps;
    default:
      return state;
  }
};

export default helpReducer;
