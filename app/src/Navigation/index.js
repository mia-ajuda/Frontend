import React, { useContext } from 'react';
import { AsyncStorage } from 'react-native';
import BottomTab from './MainNavigation/BottomNavigator';
import AuthRoutes from './AuthNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { UserContext } from '../store/contexts/userContext';
import Splash from '../pages/Splash';
import IntroSlide from '../pages/FirstAccessTutorial';

const Routes = () => {
    const { user } = useContext(UserContext);

    const isLoadingUserInformation = user && user.showSplash;
    const isUserAuthenticated = user._id;

    const isFinishedIntroSlide = async () => {
        const value = await AsyncStorage.getItem('hasOnborded');
        return value;
    };

    if (isLoadingUserInformation) {
        return <Splash />;
    }

    if (isFinishedIntroSlide === null) {
        return <IntroSlide />;
    }

    return (
        <NavigationContainer>
            {isUserAuthenticated ? <BottomTab /> : <AuthRoutes />}
        </NavigationContainer>
    );
};

export default Routes;
