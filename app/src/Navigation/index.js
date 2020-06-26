import React, { useContext } from 'react';
import BottomTab from './MainNavigation/BottomNavigation';
import AuthRoutes from './AuthNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { UserContext } from '../store/contexts/userContext';

const Routes = () => {
    const { user } = useContext(UserContext);
    const isUserAuthenticated = user.id;
    return (
        <NavigationContainer>
            {isUserAuthenticated ? <BottomTab /> : <AuthRoutes />}
        </NavigationContainer>
    );
};

export default Routes;
