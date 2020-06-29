import React, { useContext } from 'react';
import { HelpContext } from '../../../store/contexts/helpContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Notification from '../../../pages/notification';
import MyRequestsNavigation from '../MyHelpRequestsNavigator';
import MapNavigation from '../MapStackNavigator';
import ProfileNavigation from '../ProfileNavigator';
import MyOfferedHelpNavigation from '../MyOfferedHelpNavigator';
import Splash from '../../../pages/splash';
import navigationIconsConfig from './navigationsIcons.options';
import navigationOptions from './BottomNavigator.options';

const BottomNavigation = createBottomTabNavigator();
const BottomTab = () => {
    const { loadingHelps } = useContext(HelpContext);

    if (loadingHelps) return <Splash />;

    return (
        <BottomNavigation.Navigator
            tabBarOptions={navigationOptions}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) =>
                    navigationIconsConfig(focused, route),
            })}
            initialRouteName="main">
            <BottomNavigation.Screen
                name="notification"
                component={Notification}
            />
            <BottomNavigation.Screen
                name="helpList"
                component={MyRequestsNavigation}
            />
            <BottomNavigation.Screen name="main" component={MapNavigation} />
            <BottomNavigation.Screen
                name="givenHelp"
                component={MyOfferedHelpNavigation}
            />
            <BottomNavigation.Screen
                name="profile"
                component={ProfileNavigation}
            />
        </BottomNavigation.Navigator>
    );
};

export default BottomTab;
