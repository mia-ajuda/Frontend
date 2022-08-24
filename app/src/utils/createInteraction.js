import verifyUserInfo from './verifyUserInfo';

export default function createInteraction(user, navigation, nextPage) {
    if (verifyUserInfo(user)) {
        navigation.navigate(nextPage);
    } else {
        navigation.navigate('address', { nextPage });
    }
}
