import React, { useContext, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationGivenHelps } from '../../GivenHelps';
import MyOfferHelpDescription from '../../../../pages/ActivitiesPages/MyOfferedHelp/MyOfferHelpDescription';
import MyRequestDescription from '../../../../pages/ActivitiesPages/MyRequestedHelp/MyRequestHelpDescription';
import CreateHelpRequest from '../../../../pages/HelpPages/CreateHelpRequest';
import CreateHelpOffer from '../../../../pages/HelpPages/CreateHelpOffer';
import CreateCampaign from '../../../../pages/HelpPages/CreateCampaign';
import CampaignDescription from '../../../../pages/HelpPages/CampaignDescription';
import headerStyle from '../../MainNavigationStyles/MainStackHeaderStyle';
import { SelectedHelpOnMap } from '../../../../pages/ActivitiesPages/SelectedHelpOnMap';
import { UserContext } from '../../../../store/contexts/userContext';

const Stack = createStackNavigator();

export const ActivitiesRoutes = () => {
    const { user } = useContext(UserContext);
    const [confirmationModalVisible, setConfirmationModalVisible] =
        useState(false);
    const [help, setHelp] = useState(null);

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
                options={(props) =>
                    headerStyle({
                        ...props,
                        iconType: 'back',
                        buttonProps: {
                            visible:
                                help?.helperId && user._id == help?.ownerId,
                            variant: 'danger',
                            text: 'Finalizar pedido',
                            onPress: () => setConfirmationModalVisible(true),
                        },
                    })
                }
            >
                {({ route, navigation }) => {
                    return (
                        <MyRequestDescription
                            route={route}
                            navigation={navigation}
                            confirmationModalVisible={confirmationModalVisible}
                            setConfirmationModalVisible={
                                setConfirmationModalVisible
                            }
                            help={help}
                            setHelp={setHelp}
                        />
                    );
                }}
            </Stack.Screen>
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
