import React, { useContext } from 'react';
import BottomTab from './MainNavigation/BottomNavigator';
import AuthRoutes from './AuthNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { UserContext } from '../store/contexts/userContext';
import { HelpContext } from '../store/contexts/helpContext';
import Splash from '../pages/Splash';

const Routes = () => {
    const { user } = useContext(UserContext);
    const { loadingHelps } = useContext(HelpContext);
    const isLoadingUserInformation = user && user.showSplash;
    const isUserAuthenticated = user._id;

    if (isLoadingUserInformation || (isUserAuthenticated && loadingHelps)) {
        return <Splash />;
    }

    return (
        <NavigationContainer>
            {isUserAuthenticated ? <BottomTab /> : <AuthRoutes />}
        </NavigationContainer>
    );
};

export default Routes;
