import React, { useContext, useState } from 'react';
import { Text, View } from 'react-native';
import { IconButton } from '../../atoms/IconButton';
import { styles } from './styles';
import { RoundedFullButton } from '../../atoms/RoundedFullButton';
import { UserContext } from '../../../store/contexts/userContext';
import { SocialNetworkProfileContext } from '../../../store/contexts/socialNetworkProfileContext';
import { UpdaterContext } from '../../../store/contexts/updaterContext';

export const CustomHeader = ({
    title,
    navigation,
    iconType,
    shouldRenderAuxiliarButton,
    route,
}) => {
    const [userInfo, setUserInfo] = useState();
    const { user, isEntity } = useContext(UserContext);
    const { getUserProfile, followUser, unfollowUser } = useContext(
        SocialNetworkProfileContext,
    );
    const { setShouldUpdate } = useContext(UpdaterContext);
    const isDrawerButton = iconType == 'drawer';
    const userId = route?.params?.userId || user._id;
    const isTheSameUser = user._id == userId;
    const icon = isDrawerButton
        ? {
              icon: 'menu',
              theme: 'light',
              customStyle: styles.customMenuStyle,
          }
        : {
              icon: 'arrow-back',
              theme: 'dark',
          };

    const getUserInfo = async () => {
        if (!isEntity) {
            const response = await getUserProfile(userId);
            setUserInfo(response);
        }
    };

    const handleEditProfile = () => {
        navigation.navigate('editProfile');
    };

    const handleFollowButton = async () => {
        userInfo?.isFollowing
            ? await followUser(userInfo._id)
            : await unfollowUser(userInfo._id);

        setShouldUpdate(true);
    };

    const getButtonProps = () => {
        getUserInfo();
        if (isTheSameUser)
            return {
                text: 'Editar perfil',
                onPress: handleEditProfile,
            };
        return {
            variant: userInfo?.isFollowing ? 'secondary' : 'primary',
            text: userInfo?.isFollowing ? 'Seguindo' : 'Seguir',
            onPress: handleFollowButton,
        };
    };

    const onPress = isDrawerButton
        ? () => navigation.openDrawer()
        : () => navigation.goBack();

    return (
        <View style={styles.header}>
            <View style={styles.content}>
                <IconButton onPress={onPress} style={styles.icon} {...icon} />
                <Text style={styles.title}>{title}</Text>
                {shouldRenderAuxiliarButton && (
                    <View className="absolute right-2">
                        <RoundedFullButton {...getButtonProps()} />
                    </View>
                )}
            </View>
        </View>
    );
};
