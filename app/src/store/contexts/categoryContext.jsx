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
    const [selectedCategories, setSelectedCategories] = useState({
        categories: [],
        activities: [],
    });
    const [shouldFilter, setShouldFilter] = useState(false);

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
            selectedCategories,
            setSelectedCategories,
            shouldFilter,
            setShouldFilter,
        };
    }, [
        categories,
        selectedCategories,
        setSelectedCategories,
        shouldFilter,
        setShouldFilter,
    ]);

    return (
        <CategoryContext.Provider value={contextValue}>
            {props.children}
        </CategoryContext.Provider>
    );
}
