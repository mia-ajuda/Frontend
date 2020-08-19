import React, { useEffect, useContext, createContext, useState } from 'react';
import { UserContext } from './userContext';

import useService from '../../services/useService';
import HelpService from '../../services/Help';

export const HelpOfferContext = createContext();

export default function HelpOfferContextProvider({ children }) {
    const { user } = useContext(UserContext);
    const [helpOfferList, setHelpOfferList] = useState([]);

    useEffect(() => {
        const isUserAuhtenticated = user._id;
        if (isUserAuhtenticated) {
            getHelpOfferList();
        }
    }, [user]);

    async function getHelpOfferList() {
        const helpOfferListResponse = await useService(
            HelpService,
            'listHelpOffer',
        );
        if (!helpOfferListResponse.error) {
            setHelpOfferList(helpOfferListResponse);
        }
    }

    return (
        <HelpOfferContext.Provider value={{ helpOfferList }}>
            {children}
        </HelpOfferContext.Provider>
    );
}
