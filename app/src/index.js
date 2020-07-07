import React from 'react';
import Routes from './routes';
import { UserContextProvider } from './store/contexts/userContext';
import HelpContextProvider from './store/contexts/helpContext';
import CategoryContextProvider from './store/contexts/categoryContext';
import ServiceContextProvider from './store/contexts/serviceContext';

export default function Root() {
    return (
        <ServiceContextProvider>
            <UserContextProvider>
                <CategoryContextProvider>
                    <HelpContextProvider>
                        <Routes />
                    </HelpContextProvider>
                </CategoryContextProvider>
            </UserContextProvider>
        </ServiceContextProvider>
    );
}
