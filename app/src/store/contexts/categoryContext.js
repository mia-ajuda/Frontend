import React, { createContext, useState, useEffect, useContext } from 'react';
import Category from '../../services/Category';
import { UserContext } from './userContext';
import useService from '../../services/useService';

export const CategoryContext = createContext();

export default function CategoryContextProvider(props) {
    const [categories, setCategories] = useState([]);
    const { user } = useContext(UserContext);
    const [selectedCategories, setSelectedCategories] = useState([]);

    useEffect(() => {
        const isUserAuthenticated = user._id;
        if (isUserAuthenticated) fetchCategories();
    }, [user]);

    async function fetchCategories() {
        const categoriesArray = await useService(Category, 'getAllCategories');
        if (!categoriesArray.error) {
            setCategories(categoriesArray);
        }
    }

    return (
        <CategoryContext.Provider
            value={{ categories, selectedCategories, setSelectedCategories }}>
            {props.children}
        </CategoryContext.Provider>
    );
}
