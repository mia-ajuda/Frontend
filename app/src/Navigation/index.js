import React, { useContext, useEffect, useState } from 'react';
import { AsyncStorage } from 'react-native';
import BottomTab from './MainNavigation/BottomNavigator';
import AuthRoutes from './AuthNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { UserContext } from '../store/contexts/userContext';
import Splash from '../pages/Splash';
import IntroSlide from '../pages/IntroSlides';

const Routes = () => {
    const { user } = useContext(UserContext);
    const [firstTimeUser, setFirstTimeUser] = useState(null);
    const isLoadingUserInformation = user && user.showSplash;
    const isUserAuthenticated = user._id;

    useEffect(() => {
        checkIfIsANewUser();
    });

    const checkIfIsANewUser = async () => {
        setFirstTimeUser(await AsyncStorage.getItem('firstTimeUsingApp'));
    };

    if (isLoadingUserInformation) {
        return <Splash />;
    }

    if (firstTimeUser === null) {
        return <IntroSlide />;
    }

    return (
        <NavigationContainer>
            {isUserAuthenticated ? <BottomTab /> : <AuthRoutes />}
        </NavigationContainer>
    );
};

export default Routes;
