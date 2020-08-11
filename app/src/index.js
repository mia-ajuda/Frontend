import React from 'react';
import Routes from './Navigation';
import { UserContextProvider } from './store/contexts/userContext';
import HelpContextProvider from './store/contexts/helpContext';
import CampaignContextProvider from './store/contexts/campaignContext';
import CategoryContextProvider from './store/contexts/categoryContext';
import DeviceInfoProvider from './store/contexts/deviceInformationContext';

export default function Root() {
    return (
        <DeviceInfoProvider>
            <UserContextProvider>
                <CategoryContextProvider>
                    <CampaignContextProvider>
                        <HelpContextProvider>
                            <Routes />
                        </HelpContextProvider>
                    </CampaignContextProvider>
                </CategoryContextProvider>
            </UserContextProvider>
        </DeviceInfoProvider>
    );
}
