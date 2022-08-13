import React, { createContext, useState, useEffect, useContext } from 'react';
import Category from '../../services/Category';
import { UserContext } from './userContext';
import callService from '../../services/callService';

export const CategoryContext = createContext();

export default function CategoryContextProvider(props) {
    const [categories, setCategories] = useState([]);
    const { user } = useContext(UserContext);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [filterCategories, setFilterCategories] = useState(false);

    useEffect(() => {
        const isUserAuthenticated = user._id;
        if (isUserAuthenticated) fetchCategories();
    }, [user]);

    async function fetchCategories() {
        const categoriesArray = await callService(Category, 'getAllCategories');
        if (!categoriesArray.error) {
            setCategories(categoriesArray);
        }
    }

    return (
        <CategoryContext.Provider
            value={{
                categories,
                selectedCategories,
                setSelectedCategories,
                filterCategories,
                setFilterCategories,
            }}
        >
            {props.children}
        </CategoryContext.Provider>
    );
}
