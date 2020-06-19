import React from 'react';
import Routes from './routes';
import { UserContextProvider } from './store/contexts/userContext';
import HelpContextProvider from './store/contexts/helpContext';
import CategoryContextProvider from './store/contexts/categoryContext';
import LocationContextProvider from './store/contexts/locationContext';

export default function Root() {
  return (
    <UserContextProvider>
      <CategoryContextProvider>
        <LocationContextProvider>
          <HelpContextProvider>
            <Routes />
          </HelpContextProvider>
        </LocationContextProvider>
      </CategoryContextProvider>
    </UserContextProvider>
  );
}
