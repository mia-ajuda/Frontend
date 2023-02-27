import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Notification from '../../pages/Notification';
import { drawerNavigationOptions, drawerScreenOptions } from './options';
import FAQNavigator from '../MainNavigation/FAQNavigator';
import ActivitiesNavigator from '../MainNavigation/ActivitiesNavigator';
import ProfileNavigation from '../MainNavigation/ProfileNavigator';
import MainNavigation from '../MainNavigation/MapStackNavigator';
import { CustomDrawerContent } from '../../components/templates/CustomDrawerContent';
const Drawer = createDrawerNavigator();

export const DrawerNavigation = () => {
    return (
        <Drawer.Navigator
            initialRouteName="Home"
            screenOptions={drawerNavigationOptions}
            drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
            <Drawer.Screen
                name="Notifications"
                component={Notification}
                options={drawerScreenOptions('Notificações', 'notifications')}
            />
            <Drawer.Screen
                name="Home"
                component={MainNavigation}
                options={drawerScreenOptions('Mapa', 'map')}
            />
            <Drawer.Screen
                name="Activities"
                component={ActivitiesNavigator}
                options={drawerScreenOptions(
                    'Pedidos e Ofertas',
                    'hand-heart',
                    false,
                    'material-community',
                )}
            />
            <Drawer.Screen
                name="Profile"
                component={ProfileNavigation}
                options={drawerScreenOptions('Perfil', 'person', false)}
            />
            <Drawer.Screen
                name="Help"
                component={FAQNavigator}
                options={drawerScreenOptions('Ajuda', 'help')}
            />
        </Drawer.Navigator>
    );
};
