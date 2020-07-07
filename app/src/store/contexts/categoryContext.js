import React, { createContext, useState, useEffect, useContext } from 'react';
import Category from '../../services/Category';
import { UserContext } from './userContext';

export const CategoryContext = createContext();

export default function CategoryContextProvider(props) {
    const [categories, setCategories] = useState([]);
    const { user } = useContext(UserContext);
    const [selectedCategories, setSelectedCategories] = useState([]);

    useEffect(() => {
        if (user) fetchCategories();
    }, [user]);

    async function fetchCategories() {
        try {
            const categoriesArray = await Category.getAllCategories();
            setCategories(categoriesArray);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <CategoryContext.Provider
            value={{ categories, selectedCategories, setSelectedCategories }}>
            {props.children}
        </CategoryContext.Provider>
    );
}
