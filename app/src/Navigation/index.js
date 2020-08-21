import React, { useContext, AsyncStorage } from 'react';
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
        //return IntroSlideKey = await AsyncStorege.getItem(hasOnborded);
        const isFinishedIntroSlide = await AsyncStorage.getItem('hasOnborded');
        return isFinishedIntroSlide != null
            ? JSON.parse(isFinishedIntroSlide)
            : null;
    };

    if (isLoadingUserInformation) {
        return <Splash />;
    }

    if (isFinishedIntroSlide) {
        console.log('true!');
    } else {
        console.log('false');
    }
    if (isFinishedIntroSlide) {
        return <IntroSlide />;
    }

    return (
        <NavigationContainer>
            {isUserAuthenticated ? <BottomTab /> : <AuthRoutes />}
        </NavigationContainer>
    );
};

export default Routes;
