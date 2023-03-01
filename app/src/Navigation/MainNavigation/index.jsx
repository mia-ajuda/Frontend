import React, { useContext } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { drawerNavigationOptions, drawerScreenOptions } from './options';
import FAQNavigator from './FAQNavigator';
import ProfileNavigation from './ProfileNavigator';
import MainNavigation from './MapStackNavigator';
import { CustomDrawerContent } from '../../components/templates/CustomDrawerContent';
import FindUsersNavigation from './FindUsersNavigator';
import { UserContext } from '../../store/contexts/userContext';
const Drawer = createDrawerNavigator();

const mainNavigation = (routeName) => () =>
    <MainNavigation initialRouteName={routeName} />;

export const DrawerNavigation = () => {
    const { isEntity } = useContext(UserContext);
    const activitiveScreenLabel = isEntity
        ? 'Minhas Campanhas'
        : 'Meus Pedidos e Ofertas';
    return (
        <Drawer.Navigator
            initialRouteName="Home"
            screenOptions={drawerNavigationOptions}
            drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
            <Drawer.Screen
                name="Notifications"
                options={drawerScreenOptions('Notificações', 'notifications')}
            >
                {mainNavigation('notifications')}
            </Drawer.Screen>
            <Drawer.Screen
                name="Home"
                options={drawerScreenOptions('Mapa', 'map')}
            >
                {mainNavigation('home')}
            </Drawer.Screen>
            <Drawer.Screen
                name="Activities"
                options={drawerScreenOptions(
                    activitiveScreenLabel,
                    'hand-heart',
                    'material-community',
                )}
            >
                {mainNavigation('activities')}
            </Drawer.Screen>
            <Drawer.Screen
                name="Profile"
                options={drawerScreenOptions('Perfil', 'person')}
            >
                {mainNavigation('profile')}
            </Drawer.Screen>
            <Drawer.Screen
                name="Help"
                component={FAQNavigator}
                options={drawerScreenOptions('Ajuda', 'help')}
            />
            <Drawer.Screen
                name="FindUser"
                options={drawerScreenOptions('Procurar Usuários', 'search')}
            >
                {mainNavigation('searchUsers')}
            </Drawer.Screen>
        </Drawer.Navigator>
    );
};
