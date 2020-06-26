import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../../pages/authPages/Login';
import Location from '../../pages/authPages/Location';
import RegistrationData from '../../pages/authPages/RegistrationData';
import PersonalData from '../../pages/authPages/PersonalData';
import RiskGroup from '../../pages/authPages/RiskGroup';
import Photo from '../../pages/authPages/Photo';
import Address from '../../pages/authPages/Address';
import ForgotPassword from '../../pages/authPages/ForgotPassword';
import Splash from '../../pages/splash';
import { UserContext } from '../../store/contexts/userContext';

const AuthStack = createStackNavigator();
const AuthRoutes = () => {
    const { user } = useContext(UserContext);
    if (user && user.showSplash) {
        return <Splash />;
    }

    return (
        <AuthStack.Navigator
            initialRouteName="login"
            screenOptions={{
                headerShown: false,
            }}>
            <AuthStack.Screen name="login" component={Login} />
            <AuthStack.Screen name="location" component={Location} />
            <AuthStack.Screen name="address" component={Address} />
            <AuthStack.Screen
                name="registrationData"
                component={RegistrationData}
            />
            <AuthStack.Screen name="personalData" component={PersonalData} />
            <AuthStack.Screen name="riskGroup" component={RiskGroup} />
            <AuthStack.Screen name="photo" component={Photo} />
            <AuthStack.Screen
                name="forgotPassword"
                component={ForgotPassword}
            />
        </AuthStack.Navigator>
    );
};
export default AuthRoutes;
