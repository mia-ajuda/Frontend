import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Main from '../../../pages/Main';
import CreateHelp from '../../../pages/helpPages/createHelp';
import HelpDescription from '../../../pages/helpPages/helpDescription';
import headerStyle from '../MainNavigationStyles/MainStackHeaderStyle';

const Stack = createStackNavigator();

const MainNavigation = () => (
    <Stack.Navigator initialRouteName="main" screenOptions={headerStyle}>
        <Stack.Screen
            name="main"
            component={Main}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="createHelp"
            options={{ title: 'Pedir ajuda' }}
            component={CreateHelp}
        />
        <Stack.Screen
            name="helpDescription"
            options={({ route }) => ({
                title: route.params.help.title,
            })}
            component={HelpDescription}
        />
    </Stack.Navigator>
);

export default MainNavigation;
