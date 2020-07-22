import React from 'react';
import Routes from './Navigation';
import { UserContextProvider } from './store/contexts/userContext';
import HelpContextProvider from './store/contexts/helpContext';
import CategoryContextProvider from './store/contexts/categoryContext';
import ServiceContextProvider from './store/contexts/serviceContext';
import DeviceInfoProvider from './store/contexts/deviceInformationContext';

export default function Root() {
    return (
        <DeviceInfoProvider>
            <ServiceContextProvider>
                <UserContextProvider>
                    <CategoryContextProvider>
                        <HelpContextProvider>
                            <Routes />
                        </HelpContextProvider>
                    </CategoryContextProvider>
                </UserContextProvider>
            </ServiceContextProvider>
        </DeviceInfoProvider>
    );
}
