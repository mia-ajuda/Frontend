import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserContext } from './userContext';
import useService from '../../services/useService';
import CampaignService from '../../services/Campaign';

export const CampaignContext = createContext();

export default function CampaignContextProvider(props) {
    const { user, userPosition } = useContext(UserContext);
    const [campaignList, setCampaignList] = useState([]);
    const [loadingHelps, setLoadingHelps] = useState(false);

    useEffect(() => {
        const isUserAuthenticated = user._id;
        if (isUserAuthenticated) {
            getEntityList(userPosition);
            setLoadingHelps(true);
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

    // function setupWebSocket() {
    //     disconnect();
    //     const { _id: userId } = user;
    //     connect(JSON.stringify(userPosition), userId);
    // }

    return (
        <CampaignContext.Provider value={{ campaignList, loadingHelps }}>
            {props.children}
        </CampaignContext.Provider>
    );
}
