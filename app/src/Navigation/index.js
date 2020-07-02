import React, { useContext } from 'react';
import BottomTab from './MainNavigation/BottomNavigator';
import AuthRoutes from './AuthNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { UserContext } from '../store/contexts/userContext';
import Splash from '../pages/splash';

const Routes = () => {
    const { user } = useContext(UserContext);
    const isLoadingUserInformation = user && user.showSplash;
    const isUserAuthenticated = user._id;

    if (isLoadingUserInformation) {
        return <Splash />;
    }

    return (
        <NavigationContainer>
            {isUserAuthenticated ? <BottomTab /> : <AuthRoutes />}
        </NavigationContainer>
    );
};

export default Routes;
