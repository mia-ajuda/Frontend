import React from 'react';
import Routes from './routes';
import { UserContextProvider } from './store/contexts/userContext';
import HelpContextProvider from './store/contexts/helpContext';
import CategoryContextProvider from './store/contexts/categoryContext';
import LocationContextProvider from './store/contexts/locationContext';
import ServiceContextProvider from './store/contexts/serviceContext';

export default function Root() {
    return (
        <UserContextProvider>
            <CategoryContextProvider>
                <LocationContextProvider>
                    <HelpContextProvider>
                        <ServiceContextProvider>
                            <Routes />
                        </ServiceContextProvider>
                    </HelpContextProvider>
                </LocationContextProvider>
            </CategoryContextProvider>
        </UserContextProvider>
    );
}
