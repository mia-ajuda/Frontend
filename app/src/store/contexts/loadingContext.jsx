import { createContext, useMemo, useState } from 'react';
import { LoadingIndicator } from '../../components/LoadingIndicator';

export const LoadingContext = createContext({});

export const LoadingContextProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);

    const contextValue = useMemo(() => {
        return {
            isLoading,
            setIsLoading,
        };
    }, [isLoading]);

    return (
        <LoadingContext.Provider value={contextValue}>
            {isLoading && <LoadingIndicator />}
            {children}
        </LoadingContext.Provider>
    );
};
