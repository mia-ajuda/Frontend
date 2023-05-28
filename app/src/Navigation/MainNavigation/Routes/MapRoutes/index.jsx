import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Main from '../../../../pages/Main';
import MapHelpDescription from '../../../../pages/HelpPages/MapHelpDescription';
import headerStyle from '../../MainNavigationStyles/MainStackHeaderStyle';
import MapScreen from '../../../../pages/Main/MapScreen';

const Stack = createStackNavigator();

export const MapRoutes = () => {
    return (
        <>
            <Stack.Screen name="home" component={Main} options={headerStyle} />
            <Stack.Screen
                name="mapHelpDescription"
                component={MapHelpDescription}
            />
            <Stack.Screen
                name="mapScreen"
                component={MapScreen}
                options={{ headerShown: false }}
            />
        </>
    );
};
