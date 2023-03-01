import React, { useContext } from 'react';
import tabTopBarOptions from '../OngActivitiesNavigator/tabTopBarMyOffered.options';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import History from '../../../pages/ActivitiesPages/History';
import myOfferedHelp from '../../../pages/ActivitiesPages/MyOfferedHelp';
import myRequestedHelp from '../../../pages/ActivitiesPages/MyRequestedHelp';
import { UserContext } from '../../../store/contexts/userContext';
import myCampaigns from '../../../pages/ActivitiesPages/MyCampaigns';

const TopTab = createMaterialTopTabNavigator();
export const NavigationGivenHelps = () => {
    const { isEntity } = useContext(UserContext)
    return (
        <TopTab.Navigator
            initialRouteName="Atividades"
            tabBarOptions={tabTopBarOptions}
        >
            {isEntity ? OngGivenHelps() : UserGivenHelps()}
            <TopTab.Screen name="Interações" component={History} />
        </TopTab.Navigator>
    );
};

const OngGivenHelps = () => (
    <TopTab.Screen name="Campanhas" component={myCampaigns} />

)

const UserGivenHelps = () => (
    <>
        <TopTab.Screen name="Minhas ofertas" component={myOfferedHelp} />
        <TopTab.Screen name="Meus pedidos" component={myRequestedHelp} />
    </>
)