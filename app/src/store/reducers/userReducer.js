import actions from '../actions';

export const userReducer = (state, action) => {
    switch (action.type) {
        case actions.user.storeUserInfo:
            return {
                showSplash: false,
                ...action.data,
            };
        case actions.user.requestSignIn:
            return {
                showSplash: false,
            };
        case actions.user.removeUserInfo:
            return {};

        default:
            return state;
    }
};
