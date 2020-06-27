import React, { useContext } from 'react';
import { Image } from 'react-native';
import { HelpContext } from '../../../store/contexts/helpContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import Notification from '../../../pages/notification';
import MyRequestsNavigation from '../MyHelpRequestsNavigator';
import MapNavigation from '../MapStackNavigator';
import ProfileNavigation from '../ProfileNavigator';
import MyOfferedHelpNavigation from '../MyOfferedHelpNavigator';
import Splash from '../../../pages/splash';
import navigationIcons from './navigationIcons';
import navigationOptions from './BottomNavigator.options';

const BottomNavigation = createBottomTabNavigator();
const BottomTab = () => {
    const { loadingHelps } = useContext(HelpContext);

    if (loadingHelps) return <Splash />;

    return (
        <BottomNavigation.Navigator
            tabBarOptions={navigationOptions}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
                    if (route.name == 'main') {
                        const activeIcon =
                            navigationIcons[route.name].active.icon;
                        const inactiveIcon =
                            navigationIcons[route.name].inactive.icon;

                        const activeIconStyle =
                            navigationIcons[route.name].active.size;
                        const inactiveIconStyle =
                            navigationIcons[route.name].inactive.size;

                        return (
                            <Image
                                source={focused ? activeIcon : inactiveIcon}
                                style={
                                    focused
                                        ? activeIconStyle
                                        : inactiveIconStyle
                                }
                            />
                        );
                    }
                    const icon = navigationIcons[route.name].icon;
                    const activeConfig = navigationIcons[route.name].active;
                    const inactiveConfig = navigationIcons[route.name].inactive;
                    return (
                        <Icon
                            {...(focused ? activeConfig : inactiveConfig)}
                            size={20}
                            name={icon}
                            type="font-awesome"
                        />
                    );
                },
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
