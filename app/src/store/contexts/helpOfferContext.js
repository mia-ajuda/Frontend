import React, { useEffect, useContext, createContext, useState } from 'react';
import { UserContext } from './userContext';
import { CategoryContext } from './categoryContext';
import callService from '../../services/callService';
import HelpService from '../../services/Help';
import { subscribeToDeleteHelpOffer } from '../../services/socket';

export const HelpOfferContext = createContext();

export default function HelpOfferContextProvider({ children }) {
    const { user, userPosition } = useContext(UserContext);
    const [helpOfferList, setHelpOfferList] = useState([]);
    const { selectedCategories } = useContext(CategoryContext);

    useEffect(() => {
        const isUserAuthenticated = user._id;
        if (isUserAuthenticated && userPosition) {
            if (selectedCategories.length) {
                getHelpOfferListWithCategories();
            } else {
                getHelpOfferList(userPosition);
            }
        }
    }, [user, selectedCategories]);

    useEffect(() => {
        subscribeToDeleteHelpOffer((helpOfferId) =>
            setHelpOfferList((currentValue) =>
                currentValue.filter(
                    (helpOffer) => helpOffer._id != helpOfferId,
                ),
            ),
        );
    }, []);

    async function getHelpOfferList(coords) {
        const helpOfferListResponse = await callService(
            HelpService,
            'listHelpOffer',
            [coords, user._id],
        );
        if (!helpOfferListResponse.error && helpOfferListResponse) {
            setHelpOfferList(helpOfferListResponse);
        }
    }

    async function getHelpOfferListWithCategories() {
        if (selectedCategories.length) {
            const helpOfferListResponse = await callService(
                HelpService,
                'listHelpOfferWithCategories',
                [user._id, selectedCategories],
            );
            if (!helpOfferListResponse.error) {
                setHelpOfferList(helpOfferListResponse);
            }
        }
    }

    return (
        <HelpOfferContext.Provider value={{ helpOfferList, setHelpOfferList }}>
            {children}
        </HelpOfferContext.Provider>
    );
}
