import React, { useContext } from 'react';
import AuthRoutes from './AuthNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { UserContext } from '../store/contexts/userContext';
import Splash from '../pages/Splash';
import { MainNavigation } from './MainNavigation';
import { ActivitiesContext } from '../store/contexts/activitiesContext';

const Routes = () => {
    const { user } = useContext(UserContext);
    const { loadingActivities } = useContext(ActivitiesContext);
    const isLoadingUserInformation = user && user.showSplash;
    const isUserAuthenticated = user._id;

    if (isLoadingUserInformation) {
        return <Splash />;
    } else if (isUserAuthenticated && loadingActivities) {
        return <Splash showLoading={true} />;
    }

    return (
        <NavigationContainer>
            {isUserAuthenticated ? <MainNavigation /> : <AuthRoutes />}
        </NavigationContainer>
    );
};

export default Routes;
