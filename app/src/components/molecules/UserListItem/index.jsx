import { Image, Text, View } from 'react-native';
import Button from '../../UI/button';
import { styles } from './styles';
import { useContext } from 'react';
import { SocialNetworkProfileContext } from '../../../store/contexts/socialNetworkProfileContext';
import { LoadingContext } from '../../../store/contexts/loadingContext';
import { UpdaterContext } from '../../../store/contexts/updaterContext';
import shortenName from '../../../utils/shortenName';
import { RoundedFullButton } from '../../atoms/RoundedFullButton';

export const UserListItem = ({ user }) => {
    const { followUser, unfollowUser } = useContext(
        SocialNetworkProfileContext,
    );
    const { setIsLoading } = useContext(LoadingContext);
    const { setShouldUpdate } = useContext(UpdaterContext);

    const { isFollowing } = user;

    const handleClickButton = async () => {
        setIsLoading(true);
        isFollowing ? await followUser(user._id) : await unfollowUser(user._id);
        setShouldUpdate(true);
    };

    // Button will be replaced to the new one, when the new one become avaliable
    const buttonInfo = {
        text: isFollowing ? 'Seguindo' : 'Seguir',
        type: isFollowing ? 'secondary' : 'primary',
    };

    const imageSource = user.photo
        ? {
              uri: `data:image/png;base64,${user.photo}`,
          }
        : require('../../../../assets/images/noImage.jpg');

    return (
        <View style={styles.container}>
            <Image source={imageSource} style={styles.image} />
            <View style={styles.userInfo}>
                <Text
                    style={styles.userName}
                    numberOfLines={1}
                    className={'w-36'}
                >
                    {shortenName(user.username)}
                </Text>
            </View>
            <RoundedFullButton
                text={buttonInfo.text}
                onPress={handleClickButton}
                variant={buttonInfo.type}
                width={'min-w-[35%]'}
            />
        </View>
    );
};
