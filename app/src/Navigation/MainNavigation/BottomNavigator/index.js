import React, { useContext } from 'react';
import { HelpContext } from '../../../store/contexts/helpContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Notification from '../../../pages/Notification';
import InformationsCenter from '../../../pages/InformationsCenter';
import MapNavigation from '../MapStackNavigator';
import ProfileNavigation from '../ProfileNavigator';
import HistoryNavigator from '../HistoryNavigator';
import Splash from '../../../pages/Splash';
import navigationIconsConfig from './navigationIcons.options';
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
                name="FAQ"
                component={InformationsCenter}
            />
            <BottomNavigation.Screen name="main" component={MapNavigation} />
            <BottomNavigation.Screen
                name="history"
                component={HistoryNavigator}
            />
            <BottomNavigation.Screen
                name="profile"
                component={ProfileNavigation}
            />
        </BottomNavigation.Navigator>
    );
};

export default BottomTab;
