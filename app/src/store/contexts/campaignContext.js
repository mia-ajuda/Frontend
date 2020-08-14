import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserContext } from './userContext';
import useService from '../../services/useService';
import CampaignService from '../../services/Campaign';

export const CampaignContext = createContext();

export default function CampaignContextProvider(props) {
    const { user, userPosition } = useContext(UserContext);
    const [campaignList, setCampaignList] = useState([]);

    useEffect(() => {
        const isUserAuthenticated = user._id;
        if (isUserAuthenticated) {
            getEntityList(userPosition);
        }
    }, [user, userPosition]);

    async function getEntityList(coords) {
        if (coords) {
            const { _id: userId } = user;
            const campaigns = await useService(
                CampaignService,
                'getNearCampaign',
                [coords, userId],
            );
            setCampaignList(campaigns);
        }
    }

    return (
        <CampaignContext.Provider value={{ campaignList }}>
            {props.children}
        </CampaignContext.Provider>
    );
}
