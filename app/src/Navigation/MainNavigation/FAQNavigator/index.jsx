import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import headerStyle from '../MainNavigationStyles/MainStackHeaderStyle';
import InformationsCenter from '../../../pages/InformationsCenter';
import { showCustomHeader } from '../../../utils/showCustomHeader';

const Stack = createStackNavigator();

const FAQNavigator = () => (
    <Stack.Navigator screenOptions={headerStyle}>
        <Stack.Screen
            name="Central de Informações"
            component={InformationsCenter}
            options={({ navigation }) => ({
                ...showCustomHeader('Central de Informações', navigation),
            })}
        />
    </Stack.Navigator>
);

export default FAQNavigator;
