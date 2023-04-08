import { createContext, useMemo, useState } from 'react';

export const UpdaterContext = createContext({});

export const UpdaterContextProvider = ({ children }) => {
    const [shouldUpdate, setShouldUpdate] = useState(false);
    const contextValue = useMemo(
        () => ({
            shouldUpdate,
            setShouldUpdate,
        }),
        [shouldUpdate],
    );
    return (
        <UpdaterContext.Provider value={contextValue}>
            {children}
        </UpdaterContext.Provider>
    );
};
