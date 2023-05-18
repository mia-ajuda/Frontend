import verifyUserInfo from './verifyUserInfo';

export default function navigateToDescription(
    user,
    navigation,
    help,
    type = 'default',
) {
    const isUserVerified = verifyUserInfo(user);
    const isMyHelp = user?._id == help?.ownerId;
    const isCampaign = type == 'campaign';
    const nextPage = isCampaign ? 'campaignDescription' : 'mapHelpDescription';

    const helpNavigation = {
        offer: {
            screenToNavigate: isMyHelp
                ? 'myOfferHelpDescription'
                : 'mapHelpDescription',
        },
        help: {
            screenToNavigate: isMyHelp
                ? 'myRequestHelpDescription'
                : 'mapHelpDescription',
        },
    };

    const helpParams = {
        offer: {
            routeId: 'HelpOffer',
        },
        help: {
            routeId: 'Help',
        },
    };

    if (isMyHelp) {
        helpParams[type]['helpId'] = help._id;
    } else {
        helpParams[type]['help'] = help;
        helpParams[type]['routeId'] = type;
    }

    const screenToNavigate = helpNavigation[type]['screenToNavigate'];

    if (isUserVerified) {
        isCampaign
            ? navigation.navigate('campaignDescription', { campaign: help })
            : navigation.navigate(screenToNavigate, {
                  ...helpParams[type],
              });
    } else {
        navigation.navigate('address', {
            nextPage,
            nextPageParams: {
                help: help,
                helpType: type,
            },
        });
    }
}
