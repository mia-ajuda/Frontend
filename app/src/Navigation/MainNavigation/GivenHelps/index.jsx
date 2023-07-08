import React, { useContext } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import History from '../../../pages/ActivitiesPages/History';
import myOfferedHelp from '../../../pages/ActivitiesPages/MyOfferedHelp';
import myRequestedHelp from '../../../pages/ActivitiesPages/MyRequestedHelp';
import { UserContext } from '../../../store/contexts/userContext';
import myCampaigns from '../../../pages/ActivitiesPages/MyCampaigns';
import { screenOptions } from '../screenOptions';

const TopTab = createMaterialTopTabNavigator();
export const NavigationGivenHelps = () => {
    const { isEntity } = useContext(UserContext);
    return (
        <TopTab.Navigator
            initialRouteName="Atividades"
            screenOptions={screenOptions}
        >
            {isEntity ? OngGivenHelps() : UserGivenHelps()}
            <TopTab.Screen
                name="Interações"
                component={History}
                initialParams={{ shouldUpdate: true }}
            />
        </TopTab.Navigator>
    );
};

const OngGivenHelps = () => (
    <TopTab.Screen name="Campanhas" component={myCampaigns} />
);

const UserGivenHelps = () => (
    <>
        <TopTab.Screen name="Minhas ofertas" component={myOfferedHelp} />
        <TopTab.Screen
            name="Meus pedidos"
            component={myRequestedHelp}
            initialParams={{ shouldUpdate: true }}
        />
    </>
);
