import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserContext } from './userContext';
import { CategoryContext } from './categoryContext';
import useService from '../../services/useService';
import CampaignService from '../../services/Campaign';

export const CampaignContext = createContext();

export default function CampaignContextProvider(props) {
    const { user, userPosition } = useContext(UserContext);
    const { selectedCategories } = useContext(CategoryContext);
    const [campaignList, setCampaignList] = useState([]);
    const [campaignsFiltred, setCampaignsFiltred] = useState([]);

    useEffect(() => {
        const isUserAuthenticated = user._id;
        if (isUserAuthenticated) {
            getEntityList(userPosition);
            getCampaignListWithCategories(userPosition);
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
    async function getCampaignListWithCategories(coords) {
        if (coords && selectedCategories.length) {
            const { _id: userId } = user;
            const campaignStatus = await useService(
                CampaignService,
                'getAllCampaignForCategory',
                [coords, selectedCategories, userId],
            );
            setCampaignsFiltred(campaignStatus);
        }
    }
    return (
        <CampaignContext.Provider value={{ campaignList, campaignsFiltred }}>
            {props.children}
        </CampaignContext.Provider>
    );
}
