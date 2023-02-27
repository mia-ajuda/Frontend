import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { drawerNavigationOptions, drawerScreenOptions } from './options';
import FAQNavigator from '../MainNavigation/FAQNavigator';
import ActivitiesNavigator from '../MainNavigation/ActivitiesNavigator';
import ProfileNavigation from '../MainNavigation/ProfileNavigator';
import MainNavigation from '../MainNavigation/MapStackNavigator';
import { CustomDrawerContent } from '../../components/templates/CustomDrawerContent';
import FindUsersNavigation from '../MainNavigation/FindUsersNavigator';
import NavigationNotifications from '../MainNavigation/NotificationNavigator';
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
                component={NavigationNotifications}
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
            <Drawer.Screen
                name="FindUser"
                component={FindUsersNavigation}
                options={drawerScreenOptions('Procurar Usuários', 'search')}
            />
        </Drawer.Navigator>
    );
};
