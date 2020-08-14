import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import headerStyle from '../MainNavigationStyles/MainStackHeaderStyle';
import InformationsCenter from '../../../pages/InformationsCenter';

const Stack = createStackNavigator();

const FAQNavigator = () => (
    <Stack.Navigator screenOptions={headerStyle}>
        <Stack.Screen
            name="Central de Informações"
            component={InformationsCenter}
        />
    </Stack.Navigator>
);

export default FAQNavigator;
