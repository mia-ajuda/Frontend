import React, { createContext, useState, useEffect } from "react";
import Category from "../../services/Category";

export const CategoryContext = createContext();

export default function CategoryContextProvider(props) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      const categoriesArray = await Category.getAllCategories();
      setCategories(categoriesArray);
    }
    fetchCategories();
  }, []);

  return (
    <CategoryContext.Provider value={{ categories }}>
      {props.children}
    </CategoryContext.Provider>
  );
}
