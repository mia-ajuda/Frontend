import verifyUserInfo from './verifyUserInfo';

export default function navigateToDescription(
    user,
    navigation,
    id,
    ownerId,
    type,
    handleShowModal,
) {
    const isUserVerified = verifyUserInfo(user);
    const params = [id, ownerId, type];

    if (isUserVerified) {
        handleShowModal(...params);
    } else {
        navigation.navigate('address', {
            modalParams: params,
        });
    }
}
