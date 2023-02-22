import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Main from '../../pages/Main';
import Notification from '../../pages/Notification';
import { drawerNavigationOptions, drawerScreenOptions } from './options';
import FAQNavigator from '../MainNavigation/FAQNavigator';
import ActivitiesNavigator from '../MainNavigation/ActivitiesNavigator';
import ProfileNavigation from '../MainNavigation/ProfileNavigator';
const Drawer = createDrawerNavigator();

export const DrawerNavigation = () => {
    return (
        <Drawer.Navigator
            initialRouteName="Home"
            screenOptions={drawerNavigationOptions}
        >
            <Drawer.Screen
                name="Notifications"
                component={Notification}
                options={drawerScreenOptions('Notificações', 'notifications')}
            />
            <Drawer.Screen
                name="Home"
                component={Main}
                options={drawerScreenOptions('Mapa', 'map')}
            />
            <Drawer.Screen
                name="Activities"
                component={ActivitiesNavigator}
                options={drawerScreenOptions(
                    'Pedidos e Ofertas',
                    'hand-heart',
                    'material-community',
                )}
            />
            <Drawer.Screen
                name="Profile"
                component={ProfileNavigation}
                options={drawerScreenOptions('Perfil', 'person')}
            />
            <Drawer.Screen
                name="Help"
                component={FAQNavigator}
                options={drawerScreenOptions('Ajuda', 'help')}
            />
        </Drawer.Navigator>
    );
};
