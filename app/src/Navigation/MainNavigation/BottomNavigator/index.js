import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapNavigation from '../MapStackNavigator';
import ProfileNavigation from '../ProfileNavigator';
import OngActivitiesNavigator from '../OngActivitiesNavigator';
import navigationIconsConfig from './navigationIcons.options';
import navigationOptions from './BottomNavigator.options';
import FAQNavigator from '../FAQNavigator';
import NotificationNavigation from '../NotificationNavigator';
import { UserContext } from '../../../store/contexts/userContext';
import ActivitiesNavigator from '../ActivitiesNavigator';

const BottomNavigation = createBottomTabNavigator();
const BottomTab = () => {
    const { user } = useContext(UserContext);
    const isEntity = !!user.cnpj;

    return (
        <BottomNavigation.Navigator
            tabBarOptions={navigationOptions}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) =>
                    navigationIconsConfig(focused, route),
            })}
            initialRouteName="main"
            backBehavior="initialRoute">
            <BottomNavigation.Screen
                name="notification"
                component={NotificationNavigation}
            />
            <BottomNavigation.Screen name="FAQ" component={FAQNavigator} />
            <BottomNavigation.Screen name="main" component={MapNavigation} />
            <BottomNavigation.Screen
                name="history"
                component={
                    isEntity ? OngActivitiesNavigator : ActivitiesNavigator
                }
            />
            <BottomNavigation.Screen
                name="profile"
                component={ProfileNavigation}
            />
        </BottomNavigation.Navigator>
    );
};

export default BottomTab;
