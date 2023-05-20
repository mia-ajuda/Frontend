import React, { createContext, useMemo, useState } from 'react';
import callService from '../../services/callService';
import helpService from '../../services/Help';
import campaignService from '../../services/Campaign';
import { ActivityBottomSheet } from '../../components/modals/ActivityBottomSheet';

export const ActivitiesContext = createContext({});

export const ActivitiesContextProvider = ({ children }) => {
    const [showActivityModal, setShowActivityModal] = useState(false);
    const [activityInfo, setActivityInfo] = useState();

    const handleShowModal = (id, ownerId, type) => {
        setActivityInfo({ id, ownerId, type });
        setShowActivityModal(true);
    }

    const handleHideModal = () => {
        setShowActivityModal(false);
        setActivityInfo();
    }

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

    const contextValue = useMemo(() => {
        return {
            getActitivtieById,
            handleHideModal,
            handleShowModal,
            setShowActivityModal
        };
    }, [getActitivtieById, handleHideModal, handleShowModal, setShowActivityModal]);

    return (
        <ActivitiesContext.Provider value={contextValue}>
            {children}
            {showActivityModal && (
                <ActivityBottomSheet selectedActivity={activityInfo} setShowModal={setShowActivityModal} />
            )}
        </ActivitiesContext.Provider>
    );
};
