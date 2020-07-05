import React from 'react';
import Routes from './routes';
import { UserContextProvider } from './store/contexts/userContext';
import HelpContextProvider from './store/contexts/helpContext';
import CategoryContextProvider from './store/contexts/categoryContext';
import LocationContextProvider from './store/contexts/locationContext';
import DeviceInfoProvider from './store/contexts/deviceInformationContext';

export default function Root() {
    return (
        <DeviceInfoProvider>
            <UserContextProvider>
                <CategoryContextProvider>
                    <LocationContextProvider>
                        <HelpContextProvider>
                            <Routes />
                        </HelpContextProvider>
                    </LocationContextProvider>
                </CategoryContextProvider>
            </UserContextProvider>
        </DeviceInfoProvider>
    );
}
