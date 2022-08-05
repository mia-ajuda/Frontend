import verifyUserInfo from './verifyUserInfo';

export default function navigateToDescription(type, user, navigation, help) {
    return verifyUserInfo(user)
        ? navigation.navigate('mapHelpDescription', {
              help: help,
              helpType: type,
          })
        : navigation.navigate('address', {
              nextPage: 'mapHelpDescription',
              nextPageParams: {
                  help: help,
                  helpType: type,
              },
          });
}
