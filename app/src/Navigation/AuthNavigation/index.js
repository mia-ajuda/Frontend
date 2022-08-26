import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../../pages/AuthPages/Login';
import RegistrationData from '../../pages/AuthPages/RegistrationData';
import PersonalData from '../../pages/AuthPages/PersonalData';
import RiskGroup from '../../pages/AuthPages/RiskGroup';
import ForgotPassword from '../../pages/AuthPages/ForgotPassword';
import InitialScreen from '../../pages/AuthPages/InitialScreen';
import Location from '../../pages/AuthPages/Location';
import ConfirmRegister from '../../pages/AuthPages/ConfirmRegister';

const Stack = createStackNavigator();
const AuthRoutes = () => {
    return (
        <Stack.Navigator
            initialRouteName="initial"
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="initial" component={InitialScreen} />
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="location" component={Location} />
            <Stack.Screen
                name="registrationData"
                component={RegistrationData}
            />
            <Stack.Screen name="personalData" component={PersonalData} />
            <Stack.Screen name="riskGroup" component={RiskGroup} />
            <Stack.Screen name="forgotPassword" component={ForgotPassword} />
            <Stack.Screen name="confirmRegister" component={ConfirmRegister} />
        </Stack.Navigator>
    );
};
export default AuthRoutes;
