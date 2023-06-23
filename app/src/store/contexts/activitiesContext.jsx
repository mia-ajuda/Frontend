import React, { createContext, useContext, useMemo } from 'react';
import callService from '../../services/callService';
import helpService from '../../services/Help';
import campaignService from '../../services/Campaign';
import { LoadingContext } from './loadingContext';
import { HelpOfferContext } from './helpOfferContext';
import { HelpContext } from './helpContext';
import { UserContext } from './userContext';
import actions from '../actions';

export const ActivitiesContext = createContext({});

export const ActivitiesContextProvider = ({ children }) => {
    const { setIsLoading } = useContext(LoadingContext);
    const { helpOfferList, helpOfferDispatch } = useContext(HelpOfferContext);
    const { helpList, dispatch } = useContext(HelpContext);
    const { user } = useContext(UserContext);

    const activitiesServices = {
        help: helpService,
        offer: helpService,
        campaign: campaignService,
    };

    const servicesEndpoints = {
        getById: {
            help: 'getHelpWithAggregationById',
            offer: 'getHelpOfferWithAggregationById',
            campaign: 'getCampaignById',
        },
        interact: {
            help: 'offerHelp',
            offer: 'participateHelpOffer',
        },
    };

    async function getActitivtieById(activityType, activityId) {
        const activityInfo = await callService(
            activitiesServices[activityType],
            servicesEndpoints.getById[activityType],
            [activityId],
        );
        return activityInfo;
    }

    function removeElementFromMap(activityType, activityId) {
        if (activityType == 'offer') {
            const helpOfferListFiltered = helpOfferList.filter((helpOffer) => {
                return helpOffer._id != activityId;
            });
            helpOfferDispatch({
                type: actions.help.storeList,
                helps: helpOfferListFiltered,
            });
        } else {
            const filteredHelpList = helpList.filter(
                (mapHelp) => mapHelp._id != activityId,
            );
            dispatch({ type: actions.help.storeList, helps: filteredHelpList });
        }
    }

    async function interactWithActivity(
        activityType,
        activityId,
        finishLoading = false,
    ) {
        setIsLoading(true);
        const response = await callService(
            activitiesServices[activityType],
            servicesEndpoints.interact[activityType],
            [activityId, user._id],
        );
        if (!response.error) removeElementFromMap(activityType, activityId);
        if (finishLoading) setIsLoading(false);
        return response;
    }

    const contextValue = useMemo(() => {
        return {
            getActitivtieById,
            interactWithActivity,
        };
    }, [getActitivtieById, interactWithActivity]);

    return (
        <ActivitiesContext.Provider value={contextValue}>
            {children}
        </ActivitiesContext.Provider>
    );
};
