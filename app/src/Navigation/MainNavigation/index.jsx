import React, { useContext } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { drawerScreenOptions } from './options';
import Routes from './Routes';
import { CustomDrawerContent } from '../../components/templates/CustomDrawerContent';
import { UserContext } from '../../store/contexts/userContext';
import InformationsCenter from '../../pages/InformationsCenter';
import headerStyle from './MainNavigationStyles/MainStackHeaderStyle';
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
            initialRouteName="homeDrawer"
            screenOptions={headerStyle}
            drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
            <Drawer.Screen
                name="notificationsDrawer"
                options={drawerScreenOptions('Notificações', 'notifications')}
            >
                {renderRoute('notifications')}
            </Drawer.Screen>
            <Drawer.Screen
                name="homeDrawer"
                options={drawerScreenOptions('Mapa', 'map')}
            >
                {renderRoute('home')}
            </Drawer.Screen>
            <Drawer.Screen
                name="activitiesDrawer"
                options={drawerScreenOptions(
                    activitiveScreenLabel,
                    'hand-heart',
                    'material-community',
                )}
            >
                {renderRoute('activities')}
            </Drawer.Screen>
            <Drawer.Screen
                name="timelineDrawer"
                options={drawerScreenOptions('Linha do tempo', 'timeline')}
            >
                {renderRoute('timeline')}
            </Drawer.Screen>
            <Drawer.Screen
                name="feedbackDrawer"
                options={drawerScreenOptions(
                    'Feedbacks',
                    'comment-plus',
                    'material-community',
                )}
            >
                {renderRoute('feedbacks')}
            </Drawer.Screen>
            <Drawer.Screen
                name="profileDrawer"
                options={drawerScreenOptions('Perfil', 'person')}
            >
                {renderRoute('profile')}
            </Drawer.Screen>
            {!isEntity && (
                <Drawer.Screen
                    name="findUserDrawer"
                    options={drawerScreenOptions('Procurar Usuários', 'search')}
                >
                    {renderRoute('searchUsers')}
                </Drawer.Screen>
            )}
            <Drawer.Screen
                name="helpDrawer"
                component={InformationsCenter}
                options={{
                    ...drawerScreenOptions('Ajuda', 'help'),
                    headerShown: true,
                }}
            />
        </Drawer.Navigator>
    );
};
