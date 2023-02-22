import React from 'react';
import Routes from './Navigation';
import { UserContextProvider } from './store/contexts/userContext';
import HelpContextProvider from './store/contexts/helpContext';
import CampaignContextProvider from './store/contexts/campaignContext';
import CategoryContextProvider from './store/contexts/categoryContext';
import DeviceInfoProvider from './store/contexts/deviceInformationContext';
import HelpOfferContextProvider from './store/contexts/helpOfferContext';
import SocialNetworkProfileContextProvider from './store/contexts/socialNetworkProfileContext';
import { StatusBar } from 'react-native';
import colors from '../assets/styles/colorVariables';

export default function Root() {
    return (
        <>
            <StatusBar backgroundColor={colors.primary} />
            <DeviceInfoProvider>
                <UserContextProvider>
                    <SocialNetworkProfileContextProvider>
                        <CategoryContextProvider>
                            <HelpOfferContextProvider>
                                <CampaignContextProvider>
                                    <HelpContextProvider>
                                        <Routes />
                                    </HelpContextProvider>
                                </CampaignContextProvider>
                            </HelpOfferContextProvider>
                        </CategoryContextProvider>
                    </SocialNetworkProfileContextProvider>
                </UserContextProvider>
            </DeviceInfoProvider>
        </>
    );
}
