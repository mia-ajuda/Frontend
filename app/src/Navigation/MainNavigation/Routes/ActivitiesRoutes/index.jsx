import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { showCustomHeader } from '../../../../utils/showCustomHeader';
import { NavigationGivenHelps } from '../../GivenHelps';
import MyOfferHelpDescription from '../../../../pages/ActivitiesPages/MyOfferedHelp/MyOfferHelpDescription';
import ListPossibleInteresteds from '../../../../components/InterestedList';
import { MyRequestHelpDescription } from '../../MyRequestHelpDescription';
import CreateHelpRequest from '../../../../pages/HelpPages/CreateHelpRequest';
import CreateHelpOffer from '../../../../pages/HelpPages/CreateHelpOffer';
import CreateCampaign from '../../../../pages/HelpPages/CreateCampaign';
import CampaignDescription from '../../../../pages/HelpPages/CampaignDescription';

const Stack = createStackNavigator();

export const ActivitiesRoutes = () => {
    return (
        <>
            <Stack.Screen
                name="activities"
                component={NavigationGivenHelps}
                options={({ navigation }) => ({
                    ...showCustomHeader('Atividades', navigation),
                })}
            />
            <Stack.Screen
                name="myOfferHelpDescription"
                component={MyOfferHelpDescription}
                options={{ title: 'Detalhes' }}
            />
            <Stack.Screen
                name="myRequestHelpDescription"
                component={MyRequestHelpDescription}
                options={{ title: 'Detalhes' }}
            />
            <Stack.Screen
                name="listHelpInteresteds"
                component={ListPossibleInteresteds}
                options={{ title: 'Detalhes' }}
            />

            <Stack.Screen
                name="createHelpRequest"
                options={{ title: 'Pedir ajuda' }}
                component={CreateHelpRequest}
            />
            <Stack.Screen
                name="createHelpOffer"
                options={{
                    title: 'Oferecer ajuda',
                }}
                component={CreateHelpOffer}
            />
            <Stack.Screen
                name="createCampaign"
                options={{ title: 'Campanha' }}
                component={CreateCampaign}
            />
            <Stack.Screen
                name="campaignDescription"
                options={{ title: 'Contato' }}
                component={CampaignDescription}
            />
        </>
    )
}
