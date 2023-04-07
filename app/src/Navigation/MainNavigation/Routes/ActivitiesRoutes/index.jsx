import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationGivenHelps } from '../../GivenHelps';
import MyOfferHelpDescription from '../../../../pages/ActivitiesPages/MyOfferedHelp/MyOfferHelpDescription';
import ListPossibleInteresteds from '../../../../components/InterestedList';
import { MyRequestHelpDescription } from '../../MyRequestHelpDescription';
import CreateHelpRequest from '../../../../pages/HelpPages/CreateHelpRequest';
import CreateHelpOffer from '../../../../pages/HelpPages/CreateHelpOffer';
import CreateCampaign from '../../../../pages/HelpPages/CreateCampaign';
import CampaignDescription from '../../../../pages/HelpPages/CampaignDescription';
import headerStyle from '../../MainNavigationStyles/MainStackHeaderStyle';
import { SelectedHelpOnMap } from '../../../../pages/ActivitiesPages/SelectedHelpOnMap';

const Stack = createStackNavigator();

export const ActivitiesRoutes = () => {
    return (
        <>
            <Stack.Screen
                name="activities"
                component={NavigationGivenHelps}
                options={headerStyle}
            />
            <Stack.Screen
                name="myOfferHelpDescription"
                component={MyOfferHelpDescription}
            />
            <Stack.Screen
                name="myRequestHelpDescription"
                component={MyRequestHelpDescription}
            />
            <Stack.Screen
                name="listHelpInteresteds"
                component={ListPossibleInteresteds}
            />

            <Stack.Screen
                name="createHelpRequest"
                component={CreateHelpRequest}
            />
            <Stack.Screen name="createHelpOffer" component={CreateHelpOffer} />
            <Stack.Screen name="createCampaign" component={CreateCampaign} />
            <Stack.Screen
                name="campaignDescription"
                component={CampaignDescription}
            />
            <Stack.Screen
                name="selectedHelpOnMap"
                component={SelectedHelpOnMap}
            />
        </>
    );
};
