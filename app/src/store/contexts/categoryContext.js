import React, { createContext, useReducer, useEffect } from "react";
import categoryReducer from "../reducers/categoryReducer";
import Category from "../../services/Category";
import actions from "../actions";

export const CategoryContext = createContext();

export default function CategoryContextProvider(props) {
  const [categories, dispatch] = useReducer(categoryReducer, []);

  useEffect(() => {
    async function fetchCategories() {
      const categories = await Category.getAllCategories();
      dispatch({ type: actions.category.getCategories, categories });
    }
    fetchCategories();
  }, []);

  return (
    <CategoryContext.Provider value={{ categories, dispatch }}>
      {props.children}
    </CategoryContext.Provider>
  );
}
