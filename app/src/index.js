import React from 'react';
import Routes from './Navigation';
import { UserContextProvider } from './store/contexts/userContext';
import HelpContextProvider from './store/contexts/helpContext';
import CategoryContextProvider from './store/contexts/categoryContext';
import DeviceInfoProvider from './store/contexts/deviceInformationContext';

export default function Root() {
    return (
        <DeviceInfoProvider>
            <UserContextProvider>
                <CategoryContextProvider>
                    <HelpContextProvider>
                        <Routes />
                    </HelpContextProvider>
                </CategoryContextProvider>
            </UserContextProvider>
        </DeviceInfoProvider>
    );
}
