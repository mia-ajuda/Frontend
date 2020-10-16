import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import NotificationPage from '../../../pages/Notification/index';
import MapHelpDescription from '../../../pages/HelpPages/MapHelpDescription';
import MyOfferHelpDescription from '../../../pages/HelpPages/MyOfferHelpDescription';
import headerStyle from '../MainNavigationStyles/MainStackHeaderStyle';
import MyRequestDescription from '../../../pages/HelpPages/MyRequestHelpDescrition';

const Stack = createStackNavigator();

const NavigationNotifications = () => (
    <Stack.Navigator screenOptions={headerStyle}>
        <Stack.Screen
            name="notifications"
            component={NotificationPage}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="mapHelpDescription"
            options={{ title: 'Detalhes' }}
            component={MapHelpDescription}
        />
        <Stack.Screen
            name="myOfferHelpDescription"
            component={MyOfferHelpDescription}
            options={{ title: 'Detalhes' }}
        />
        <Stack.Screen
            name="MyRequestHelpDescrition"
            component={MyRequestDescription}
            options={{ title: 'Detalhes' }}
        />
        <Stack.Screen
            name="OfferDescription"
            component={MyOfferHelpDescription}
            options={{ title: 'Detalhes' }}
        />
    </Stack.Navigator>
);

export default NavigationNotifications;
