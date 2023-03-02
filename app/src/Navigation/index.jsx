import React, { useContext } from 'react';
import AuthRoutes from './AuthNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { UserContext } from '../store/contexts/userContext';
import { HelpContext } from '../store/contexts/helpContext';
import Splash from '../pages/Splash';
import { MainNavigation } from './MainNavigation';

const Routes = () => {
    const { user } = useContext(UserContext);
    const { loadingHelps } = useContext(HelpContext);
    const isLoadingUserInformation = user && user.showSplash;
    const isUserAuthenticated = user._id;

    if (isLoadingUserInformation) {
        return <Splash />;
    } else if (isUserAuthenticated && loadingHelps) {
        return <Splash showLoading={true} />;
    }

    return (
        <NavigationContainer>
            {isUserAuthenticated ? <MainNavigation /> : <AuthRoutes />}
        </NavigationContainer>
    );
};

export default Routes;
