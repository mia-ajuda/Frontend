import verifyUserInfo from './verifyUserInfo';

export default function navigateToDescription(
    user,
    navigation,
    activity,
    type,
) {
    const isUserVerified = verifyUserInfo(user);

    const activityNavigation = {
        offer: 'mapHelpDescription',
        help: 'mapHelpDescription',
        campaign: 'campaignDescription',
    };

    const commonParams = {
        help: activity,
        routeId: type,
    };

    const activityParams = {
        offer: { ...commonParams },
        help: { ...commonParams },
        campaign: { campaign: activity },
    };

    const route = activityNavigation[type];
    const params = activityParams[type];
    if (isUserVerified) {
        navigation.navigate(route, params);
    } else {
        navigation.navigate('address', {
            nextPage: route,
            nextPageParams: params,
        });
    }
}
