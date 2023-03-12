import { createContext, useState } from 'react';
import { LoadingIndicator } from '../../components/LoadingIndicator';

export const LoadingContext = createContext({});

export const LoadingContextProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    return (
        <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
            {isLoading && <LoadingIndicator />}
            {children}
        </LoadingContext.Provider>
    );
};
