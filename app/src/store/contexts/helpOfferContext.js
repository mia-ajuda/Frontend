import React, { useEffect, useContext, createContext, useReducer } from 'react';
import { UserContext } from './userContext';
import { CategoryContext } from './categoryContext';
import callService from '../../services/callService';
import HelpService from '../../services/Help';
import { subscribeToDeleteHelpOffer } from '../../services/socket';
import actions from '../actions';
import helpReducer from '../reducers/helpReducer';

export const HelpOfferContext = createContext();

export default function HelpOfferContextProvider({ children }) {
    const { user, userPosition } = useContext(UserContext);
    const [helpOfferList, dispatch] = useReducer(helpReducer, []);
    const { selectedCategories, filterCategories } =
        useContext(CategoryContext);

    useEffect(() => {
        const isUserAuthenticated = user._id;
        if (isUserAuthenticated && userPosition) {
            if (selectedCategories.length) {
                // setIsLoading(true);
                // getHelpOfferListWithCategories(userPosition);
            } else {
                getHelpOfferList(userPosition);
            }
        }
    }, [user, selectedCategories]);

    useEffect(() => {
        subscribeToDeleteHelpOffer((helpOfferId) => {
            const filteredHelpOfferList = helpOfferList.filter((helpOffer) => {
                return helpOffer._id != helpOfferId;
            });

            dispatch({
                type: actions.help.storeList,
                helps: filteredHelpOfferList,
            });
        });
    }, []);

    async function getHelpOfferList(coords) {
        const helpOfferListResponse = await callService(
            HelpService,
            'listHelpOffer',
            [coords, user._id],
        );
        if (!helpOfferListResponse.error && helpOfferListResponse) {
            dispatch({
                type: actions.help.storeList,
                helps: helpOfferListResponse,
            });
        }
    }

    async function getHelpOfferListWithCategories(coords) {
        if (coords && selectedCategories.length && filterCategories) {
            const helpOfferListResponse = await callService(
                HelpService,
                'listHelpOfferWithCategories',
                [coords, user._id, selectedCategories],
            );
            if (!helpOfferListResponse.error) {
                dispatch({
                    type: actions.help.storeList,
                    helps: helpOfferListResponse,
                });
            }
        }
    }

    return (
        <HelpOfferContext.Provider
            value={{
                helpOfferList,
                helpOfferDispatch: dispatch,
                getHelpOfferListWithCategories,
            }}
        >
            {children}
        </HelpOfferContext.Provider>
    );
}
