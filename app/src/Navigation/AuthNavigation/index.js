import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../../pages/authPages/Login';
import Location from '../../pages/authPages/Location';
import RegistrationData from '../../pages/authPages/RegistrationData';
import PersonalData from '../../pages/authPages/PersonalData';
import RiskGroup from '../../pages/authPages/RiskGroup';
import Photo from '../../pages/authPages/Photo';
import PreviewPhoto from '../../pages/authPages/Photo/PhotoPreview';
import Address from '../../pages/authPages/Address';
import ForgotPassword from '../../pages/authPages/ForgotPassword';

const Stack = createStackNavigator();
const AuthRoutes = () => {
    return (
        <Stack.Navigator
            initialRouteName="login"
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="location" component={Location} />
            <Stack.Screen name="address" component={Address} />
            <Stack.Screen
                name="registrationData"
                component={RegistrationData}
            />
            <Stack.Screen name="personalData" component={PersonalData} />
            <Stack.Screen name="riskGroup" component={RiskGroup} />
            <Stack.Screen name="photo" component={Photo} />
            <Stack.Screen name="photoPreview" component={PreviewPhoto} />
            <Stack.Screen name="forgotPassword" component={ForgotPassword} />
        </Stack.Navigator>
    );
};
export default AuthRoutes;
