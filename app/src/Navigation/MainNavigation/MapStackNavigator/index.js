import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Main from '../../../pages/Main';
import CreateHelp from '../../../pages/helpPages/createHelp';
import HelpDescription from '../../../pages/helpPages/helpDescription';
import headerStyle from '../MainStackHeaderStyle';
const MainStack = createStackNavigator();

const MainNavigation = () => (
    <MainStack.Navigator initialRouteName="main" screenOptions={headerStyle}>
        <MainStack.Screen
            name="main"
            component={Main}
            options={{ headerShown: false }}
        />
        <MainStack.Screen
            name="createHelp"
            options={{ title: 'Pedir ajuda' }}
            component={CreateHelp}
        />
        <MainStack.Screen
            name="helpDescription"
            options={({ route }) => ({
                title: route.params.helpTitle,
            })}
            component={HelpDescription}
        />
    </MainStack.Navigator>
);

export default MainNavigation;
