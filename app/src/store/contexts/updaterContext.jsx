import { createContext, useState } from 'react';

export const UpdaterContext = createContext({});

export const UpdaterContextProvider = ({ children }) => {
    const [shouldUpdate, setShouldUpdate] = useState(false);
    return (
        <UpdaterContext.Provider value={{ shouldUpdate, setShouldUpdate }}>
            {children}
        </UpdaterContext.Provider>
    );
};
