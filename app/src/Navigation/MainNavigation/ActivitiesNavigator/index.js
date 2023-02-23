import React from 'react';
import MyRequestDescription from '../../../pages/ActivitiesPages/MyRequestedHelp/MyRequestHelpDescription';
import MyOfferHelpDescription from '../../../pages/ActivitiesPages/MyOfferedHelp/MyOfferHelpDescription';
import headerStyle from '../MainNavigationStyles/MainStackHeaderStyle';
import tabTopBarOptions from './tabTopBarMyOffered.options';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import History from '../../../pages/ActivitiesPages/History';
import myOfferedHelp from '../../../pages/ActivitiesPages/MyOfferedHelp';
import myRequestedHelp from '../../../pages/ActivitiesPages/MyRequestedHelp';
import ListPossibleInteresteds from '../../../components/InterestedList';
import HelpersInfo from '../../../components/HelpersInfo';
import { showDrawerButtonInStackOption } from '../../DrawerNavigation/options';

const TopTab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const NavigationGivenHelps = () => (
    <TopTab.Navigator
        initialRouteName="Atividades"
        tabBarOptions={tabTopBarOptions}
    >
        <TopTab.Screen name="Minhas ofertas" component={myOfferedHelp} />
        <TopTab.Screen name="Meus pedidos" component={myRequestedHelp} />
        <TopTab.Screen name="Interações" component={History} />
    </TopTab.Navigator>
);

const NavigationMyRequestHelpDescription = ({ route, navigation }) => {
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

const ActivitiesNavigator = () => (
    <Stack.Navigator screenOptions={headerStyle}>
        <Stack.Screen
            name="Atividades"
            component={NavigationGivenHelps}
            options={showDrawerButtonInStackOption}
        />
        <Stack.Screen
            name="MyOfferHelpDescription"
            component={MyOfferHelpDescription}
            options={{ title: 'Detalhes' }}
        />
        <Stack.Screen
            name="MyRequestHelpDescription"
            component={NavigationMyRequestHelpDescription}
            options={{ title: 'Detalhes' }}
        />
        <Stack.Screen
            name="ListHelpInteresteds"
            component={ListPossibleInteresteds}
            options={{ title: 'Detalhes' }}
        />
    </Stack.Navigator>
);

export { NavigationGivenHelps };
export default ActivitiesNavigator;
