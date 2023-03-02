import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { showCustomHeader } from '../../../../utils/showCustomHeader';
import Main from '../../../../pages/Main';
import MapHelpDescription from '../../../../pages/HelpPages/MapHelpDescription';

const Stack = createStackNavigator();

export const MapRoutes = () => {
    return (
        <>
            <Stack.Screen
                name="home"
                component={Main}
                options={({ navigation }) => ({
                    ...showCustomHeader('Mapa', navigation),
                    title: 'Mapa',
                })}
            />
            <Stack.Screen
                name="mapHelpDescription"
                options={{ title: 'Detalhes' }}
                component={MapHelpDescription}
            />
        </>
    )
}
