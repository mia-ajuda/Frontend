import React from 'react';
import MyRequestDescription from '../../../pages/ActivitiesPages/MyRequestedHelp/MyRequestHelpDescription';
import tabTopBarOptions from '../OngActivitiesNavigator/tabTopBarMyOffered.options';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HelpersInfo from '../../../components/HelpersInfo';


const TopTab = createMaterialTopTabNavigator();
export const MyRequestHelpDescription = ({ route, navigation }) => {
    const { help } = route.params;
    return help.helperId ? (
        <TopTab.Navigator
            initialRouteName="InfosPedido"
            tabBarOptions={tabTopBarOptions}
        >
            <TopTab.Screen name="Ajudante">
                {() => (
                    <HelpersInfo
                        userId={help.helperId}
                        title="Ajudante escolhido"
                    />
                )}
            </TopTab.Screen>
            <TopTab.Screen
                initialParams={{
                    help: help,
                }}
                name="Informação do Pedido"
                component={MyRequestDescription}
            />
        </TopTab.Navigator>
    ) : (
        <MyRequestDescription route={route} navigation={navigation} />
    );
};
