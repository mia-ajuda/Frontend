import actions from "../actions";

const categoryReducer = (state, action) => {
  switch (action.type) {
    case actions.category.getCategories:
      return action.categories;
  }
};

export default categoryReducer;
