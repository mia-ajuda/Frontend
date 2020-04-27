import React, { createContext, useState, useEffect, useContext } from "react";
import Category from "../../services/Category";
import { UserContext } from "./userContext";

export const CategoryContext = createContext();

export default function CategoryContextProvider(props) {
  const [categories, setCategories] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user.info) fetchCategories();
  }, [user]);

  async function fetchCategories() {
    const categoriesArray = await Category.getAllCategories();
    setCategories(categoriesArray);
  }

  return (
    <CategoryContext.Provider value={{ categories }}>
      {props.children}
    </CategoryContext.Provider>
  );
}
