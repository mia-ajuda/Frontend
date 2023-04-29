import React, { useContext, useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { TextSwitch } from '../../components/molecules/TextSwitch';
import { SocialNetworkProfileContext } from '../../store/contexts/socialNetworkProfileContext';
import { LoadingContext } from '../../store/contexts/loadingContext';
import { FollowCount } from '../../components/molecules/FollowCount';
import { RoundedFullButton } from '../../components/atoms/RoundedFullButton';
import { UpdaterContext } from '../../store/contexts/updaterContext';
import { ActivitiesList } from '../../components/organisms/ActivitiesList';
import { DescriptionBox } from '../../components/molecules/DescriptionBox';
import { UserContext } from '../../store/contexts/userContext';
import { BadgeContext } from '../../store/contexts/badgeContext';
import { ScrollView } from 'react-native-gesture-handler';
import { BadgesList } from '../../components/organisms/BadgesList';
import { useNavigation } from '@react-navigation/native';

export const UserProfile = ({ route }) => {
    const [selectedOption, setSelectedOption] = useState(0);
    const [userInfo, setUserInfo] = useState();
    const [activities, setActivities] = useState({});
    const [badges, setBadges] = useState([]);
    const { getUserProfile, getActivities, followUser, unfollowUser } =
        useContext(SocialNetworkProfileContext);
    const { setIsLoading } = useContext(LoadingContext);
    const { shouldUpdate, setShouldUpdate } = useContext(UpdaterContext);
    const { user } = useContext(UserContext);
    const { getUserBadges } = useContext(BadgeContext);
    const navigator = useNavigation();

    const userId = route?.params?.userId || user._id;

    const isTheSameUser = user._id == userId;
    const displayName = isTheSameUser ? user?.name : userInfo?.username;
    const biography = isTheSameUser ? user?.biography : userInfo?.biography;
    const showActivities = selectedOption == 0;
    const showBadges = selectedOption == 1;

    const handleFollowButton = async () => {
        setIsLoading(true);
        userInfo?.isFollowing
            ? await followUser(userInfo._id)
            : await unfollowUser(userInfo._id);
        setShouldUpdate(true);
    };

    const handleEditProfile = () => {
        navigator.navigate('editProfile');
    };

    const handleLoadScreenData = async () => {
        setIsLoading(true);
        Promise.all([getActivitiesInfo(), getUserInfo(), getBadges()]).then(
            () => {
                setIsLoading(false);
                setShouldUpdate(false);
            },
        );
    };

    const getActivitiesInfo = async () => {
        const response = await getActivities(userId);
        setActivities(response);
    };

    const getUserInfo = async () => {
        const response = await getUserProfile(userId);
        setUserInfo(response);
    };

    const getBadges = async () => {
        const response = await getUserBadges(userId);
        setBadges(response);
    };
    const imageSource = userInfo?.photo
        ? {
              uri: `data:image/png;base64,${userInfo?.photo}`,
          }
        : require('../../../assets//images/noImage.png');

    const getButtonProps = () => {
        if (isTheSameUser)
            return {
                variant: 'primary',
                text: 'Editar perfil',
                action: handleEditProfile,
            };
        return {
            variant: userInfo?.isFollowing ? 'secondary' : 'primary',
            text: userInfo?.isFollowing ? 'Seguindo' : 'Seguir',
            action: handleFollowButton,
        };
    };

    const buttonProps = getButtonProps();

    useEffect(() => {
        if (shouldUpdate || !userInfo) handleLoadScreenData();
    }, [shouldUpdate]);

    return (
        <ScrollView>
            <View className="flex-1 items-center mt-8">
                <View className="absolute right-2">
                    <RoundedFullButton
                        variant={buttonProps.variant}
                        onPress={buttonProps.action}
                        text={buttonProps.text}
                    />
                </View>
                <Image
                    source={imageSource}
                    className="w-16 h-16 rounded-full absolute z-50 mt-2"
                />
                <View className="bg-white items-center px-8 py-7 gap-1 h-full mt-12 w-full rounded-3xl">
                    <Text
                        className="font-ms-bold text-black text-lg"
                        numberOfLines={1}
                    >
                        {displayName}
                    </Text>
                    {userInfo?.followsYou && (
                        <Text className="text-slate-400 font-ms-light">
                            Segue você
                        </Text>
                    )}
                    <View className="flex-row items-center my-1">
                        <FollowCount
                            type="followers"
                            count={userInfo?.numberOfFollowers}
                            userId={userInfo?.id}
                        />
                        <FollowCount
                            type="following"
                            count={userInfo?.numberOfFollowing}
                            userId={userInfo?.id}
                        />
                    </View>

                    <DescriptionBox title="Biografia" description={biography} />
                    <TextSwitch
                        option1="Atividades"
                        option2="Conquistas"
                        selectedOption={selectedOption}
                        setSelectedOption={setSelectedOption}
                    />
                    {showActivities && (
                        <ActivitiesList activities={activities} />
                    )}
                    {showBadges && (
                        <BadgesList badges={badges} userId={userId} />
                    )}
                </View>
            </View>
        </ScrollView>
    );
};
