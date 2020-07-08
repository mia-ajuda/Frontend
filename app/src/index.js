import React from 'react';
import Routes from './Navigation';
import { UserContextProvider } from './store/contexts/userContext';
import HelpContextProvider from './store/contexts/helpContext';
import CategoryContextProvider from './store/contexts/categoryContext';

export default function Root() {
    return (
        <UserContextProvider>
            <CategoryContextProvider>
                <HelpContextProvider>
                    <Routes />
                </HelpContextProvider>
            </CategoryContextProvider>
        </UserContextProvider>
    );
}
