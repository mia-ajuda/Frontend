import React, { useContext } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { drawerNavigationOptions, drawerScreenOptions } from './options';
import Routes from './Routes';
import { CustomDrawerContent } from '../../components/templates/CustomDrawerContent';
import { UserContext } from '../../store/contexts/userContext';
import InformationsCenter from '../../pages/InformationsCenter';
import { showCustomHeader } from '../../utils/showCustomHeader';
const Drawer = createDrawerNavigator();

const renderRoute = (routeName) => () =>
    <Routes initialRouteName={routeName} />;

export const MainNavigation = () => {
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
                {renderRoute('notifications')}
            </Drawer.Screen>
            <Drawer.Screen
                name="Home"
                options={drawerScreenOptions('Mapa', 'map')}
            >
                {renderRoute('home')}
            </Drawer.Screen>
            <Drawer.Screen
                name="Activities"
                options={drawerScreenOptions(
                    activitiveScreenLabel,
                    'hand-heart',
                    'material-community',
                )}
            >
                {renderRoute('activities')}
            </Drawer.Screen>
            <Drawer.Screen
                name="Profile"
                options={drawerScreenOptions('Perfil', 'person')}
            >
                {renderRoute('profile')}
            </Drawer.Screen>
            <Drawer.Screen
                name="Help"
                component={InformationsCenter}
                options={({ navigation }) => ({
                    ...drawerScreenOptions('Ajuda', 'help'),
                    ...showCustomHeader('Central de Informações', navigation),
                    headerShown: true
                })}
            />
            <Drawer.Screen
                name="FindUser"
                options={drawerScreenOptions('Procurar Usuários', 'search')}
            >
                {renderRoute('searchUsers')}
            </Drawer.Screen>
        </Drawer.Navigator>
    );
};
