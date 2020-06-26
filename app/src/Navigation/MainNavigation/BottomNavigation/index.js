import React, { useContext } from 'react';
import { Image } from 'react-native';
import colors from '../../../../assets/styles/colorVariables';
import { HelpContext } from '../../../store/contexts/helpContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import Notification from '../../../pages/notification';
import MyRequestsNavigation from '../MyHelpRequestsNavigation';
import MapNavigation from '../MapStackNavigation';
import ProfileNavigation from '../ProfileNavigation';
import MyOfferedHelpNavigation from '../MyOfferedHelpNavigation';
import Splash from '../../../pages/splash';

const BottomNavigation = createBottomTabNavigator();
const BottomTab = () => {
    const { loadingHelps } = useContext(HelpContext);

    if (loadingHelps) return <Splash />;
    return (
        <BottomNavigation.Navigator
            tabBarOptions={{
                style: {
                    height: 60,
                    borderTopColor: colors.primary,
                    shadowOpacity: 0,
                    elevation: 0,
                },
                keyboardHidesTabBar: true,
                activeTintColor: colors.light,
                inactiveTintColor: colors.dark,
                inactiveBackgroundColor: colors.primary,
                activeBackgroundColor: colors.primary,
                tabStyle: {
                    justifyContent: 'center',
                },
                showLabel: false,
            }}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
                    let selectConfig;

                    switch (route.name) {
                        case 'main':
                            selectConfig = focused
                                ? {
                                      src: require('../../../../assets/images/whileLogo.png'),
                                      size: { height: 40, width: 40 },
                                  }
                                : {
                                      src: require('../../../../assets/images/whiteCat.png'),
                                      size: {
                                          height: 25,
                                          width: 25,
                                          resizeMode: 'contain',
                                      },
                                  };
                            return (
                                <Image
                                    source={selectConfig.src}
                                    style={selectConfig.size}
                                />
                            );

                        case 'helpList':
                            selectConfig = focused
                                ? {
                                      color: colors.primary,
                                      raised: true,
                                      name: 'outdent',
                                  }
                                : {
                                      color: colors.light,
                                      raised: false,
                                      name: 'outdent',
                                  };
                            break;

                        case 'givenHelp':
                            selectConfig = focused
                                ? {
                                      color: colors.primary,
                                      raised: true,
                                      name: 'outdent',
                                  }
                                : {
                                      color: colors.light,
                                      raised: false,
                                      name: 'outdent',
                                  };
                            break;
                        case 'notification':
                            selectConfig = focused
                                ? {
                                      color: colors.primary,
                                      raised: true,
                                      name: 'bell',
                                  }
                                : {
                                      color: colors.light,
                                      raised: false,
                                      name: 'bell',
                                  };
                            break;
                        case 'profile':
                            selectConfig = focused
                                ? {
                                      color: colors.primary,
                                      raised: true,
                                      name: 'user-circle',
                                  }
                                : {
                                      color: colors.light,
                                      raised: false,
                                      name: 'user-circle',
                                  };
                            break;
                    }

                    return (
                        <Icon
                            raised={selectConfig.raised}
                            size={20}
                            name={selectConfig.name}
                            type="font-awesome"
                            color={selectConfig.color}
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
