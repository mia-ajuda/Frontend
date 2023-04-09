import React, { createContext, useMemo } from 'react';
import callService from '../../services/callService';
import helpService from '../../services/Help';
import campaignService from '../../services/Campaign';

export const ActivitiesContext = createContext({});

export const ActivitiesContextProvider = ({ children }) => {
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
    };

    async function getActitivtieById(activityType, activityId) {
        const activityInfo = await callService(
            activitiesServices[activityType],
            servicesEndpoints.getById[activityType],
            [activityId],
        );
        return activityInfo;
    }

    return (
        <ActivitiesContext.Provider value={{ getActitivtieById }}>
            {children}
        </ActivitiesContext.Provider>
    );
};
