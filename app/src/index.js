import React from 'react';
import Routes from './Navigation';
import { UserContextProvider } from './store/contexts/userContext';
import HelpContextProvider from './store/contexts/helpContext';
import CategoryContextProvider from './store/contexts/categoryContext';
import DeviceInfoProvider from './store/contexts/deviceInformationContext';
import SocialNetworkProfileContextProvider from './store/contexts/socialNetworkProfileContext';
import { LoadingContextProvider } from './store/contexts/loadingContext';
import { ScreenTemplateContextProvider } from './store/contexts/ScreenTemplateContext';
import { ActivitiesContextProvider } from './store/contexts/activitiesContext';
import BadgeContextProvider from './store/contexts/badgeContext';
import CepContextProvider from './store/contexts/cepContext';
import { ActivityBottomSheetContextProvider } from './store/contexts/activityBottomSheetContext';
import { FeedbackContextProvider } from './store/contexts/feedbackContext';
import { TimelineContextProvider } from './store/contexts/timelineContext';

export default function Root() {
    return (
        <>
            <DeviceInfoProvider>
                <UserContextProvider>
                    <LoadingContextProvider>
                        <SocialNetworkProfileContextProvider>
                            <CategoryContextProvider>
                                <HelpContextProvider>
                                    <BadgeContextProvider>
                                        <ActivitiesContextProvider>
                                            <ActivityBottomSheetContextProvider>
                                                <FeedbackContextProvider>
                                                    <TimelineContextProvider>
                                                        <CepContextProvider>
                                                            <ScreenTemplateContextProvider>
                                                                <Routes />
                                                            </ScreenTemplateContextProvider>
                                                        </CepContextProvider>
                                                    </TimelineContextProvider>
                                                </FeedbackContextProvider>
                                            </ActivityBottomSheetContextProvider>
                                        </ActivitiesContextProvider>
                                    </BadgeContextProvider>
                                </HelpContextProvider>
                            </CategoryContextProvider>
                        </SocialNetworkProfileContextProvider>
                    </LoadingContextProvider>
                </UserContextProvider>
            </DeviceInfoProvider>
        </>
    );
}
