import verifyUserInfo from './verifyUserInfo';

export default function navigateToDescription(type, user, navigation, help) {
    const isUserVerified = verifyUserInfo(user);
    const isCampaign = type == 'campaign';
    const nextPage = isCampaign ? 'campaignDescription' : 'mapHelpDescription';
    if (isUserVerified) {
        isCampaign
            ? navigation.navigate('campaignDescription', { campaign: help })
            : navigation.navigate('mapHelpDescription', {
                  help: help,
                  helpType: type,
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
