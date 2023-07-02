import React, {
    createContext,
    useState,
    useEffect,
    useContext,
    useMemo,
} from 'react';
import Category from '../../services/Category';
import { UserContext } from './userContext';
import callService from '../../services/callService';

export const CategoryContext = createContext();

export default function CategoryContextProvider(props) {
    const [categories, setCategories] = useState([]);
    const { user } = useContext(UserContext);

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

    const contextValue = useMemo(() => {
        return {
            categories,
        };
    }, [categories]);

    return (
        <CategoryContext.Provider value={contextValue}>
            {props.children}
        </CategoryContext.Provider>
    );
}
