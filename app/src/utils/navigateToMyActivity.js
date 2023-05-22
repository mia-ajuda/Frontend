export default function navigateToMyActivity(navigation, activity, type) {
    const helpNavigation = {
        offer: 'myOfferHelpDescription',
        help: 'myRequestHelpDescription',
        campaign: 'campaignDescription',
    };

    const helpParams = {
        offer: { routeId: 'HelpOffer', helpId: activity._id },
        help: { routeId: 'Help', helpId: activity._id },
        campaign: { campaign: activity },
    };

    navigation.navigate(helpNavigation[type], { ...helpParams[type] });
}
