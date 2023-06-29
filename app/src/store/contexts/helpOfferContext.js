import React, { createContext, useState } from 'react';

export const HelpOfferContext = createContext();

export default function HelpOfferContextProvider({ children }) {
    const [helpOfferList, setHelpOfferList] = useState([]);

    return (
        <HelpOfferContext.Provider value={{ helpOfferList, setHelpOfferList }}>
            {children}
        </HelpOfferContext.Provider>
    );
}
