import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import NotificationPage from '../../../pages/Notification/index';
import MapHelpDescription from '../../../pages/HelpPages/MapHelpDescription';
import MyOfferHelpDescription from '../../../pages/HelpPages/MyOfferHelpDescription';
import headerStyle from '../MainNavigationStyles/MainStackHeaderStyle';
import MyRequestDescription from '../../../pages/HelpPages/MyRequestHelpDescrition';
import ListPossibleHelpers from '../../../pages/HelpPages/MyRequestHelpDescrition/ListPossibleHelpers';
import HistoryNavigator from '../HistoryNavigator';

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
        />
        <Stack.Screen
            name="myRequestDescription"
            component={MyRequestDescription}
        />
        <Stack.Screen
            name="listPossibleHelpers"
            component={ListPossibleHelpers}
        />
        <Stack.Screen name="history" component={HistoryNavigator} />
    </Stack.Navigator>
);

export default NavigationNotifications;
