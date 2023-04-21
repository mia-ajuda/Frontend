import React from 'react';
import Routes from './Navigation';
import { UserContextProvider } from './store/contexts/userContext';
import HelpContextProvider from './store/contexts/helpContext';
import CampaignContextProvider from './store/contexts/campaignContext';
import CategoryContextProvider from './store/contexts/categoryContext';
import DeviceInfoProvider from './store/contexts/deviceInformationContext';
import HelpOfferContextProvider from './store/contexts/helpOfferContext';
import SocialNetworkProfileContextProvider from './store/contexts/socialNetworkProfileContext';
import { LoadingContextProvider } from './store/contexts/loadingContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ScreenTemplate } from './templates/ScreenTemplate';
import { UpdaterContextProvider } from './store/contexts/updaterContext';
import { ActivitiesContextProvider } from './store/contexts/activitiesContext';

export default function Root() {
    return (
        <>
            <DeviceInfoProvider>
                <SafeAreaProvider>
                    <UpdaterContextProvider>
                        <LoadingContextProvider>
                            <UserContextProvider>
                                <SocialNetworkProfileContextProvider>
                                    <ActivitiesContextProvider>
                                        <CategoryContextProvider>
                                            <HelpOfferContextProvider>
                                                <CampaignContextProvider>
                                                    <HelpContextProvider>
                                                        <ScreenTemplate>
                                                            <Routes />
                                                        </ScreenTemplate>
                                                    </HelpContextProvider>
                                                </CampaignContextProvider>
                                            </HelpOfferContextProvider>
                                        </CategoryContextProvider>
                                    </ActivitiesContextProvider>
                                </SocialNetworkProfileContextProvider>
                            </UserContextProvider>
                        </LoadingContextProvider>
                    </UpdaterContextProvider>
                </SafeAreaProvider>
            </DeviceInfoProvider>
        </>
    );
}
