import React, { useContext, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { TextSwitch } from '../../components/molecules/TextSwitch';
import { SocialNetworkProfileContext } from '../../store/contexts/socialNetworkProfileContext';
import { LoadingContext } from '../../store/contexts/loadingContext';
import { FollowCount } from '../../components/molecules/FollowCount';
import { ActivitiesList } from '../../components/organisms/ActivitiesList';
import { DescriptionBox } from '../../components/molecules/DescriptionBox';
import { UserContext } from '../../store/contexts/userContext';
import { BadgeContext } from '../../store/contexts/badgeContext';
import { ScrollView } from 'react-native-gesture-handler';
import { BadgesList } from '../../components/organisms/BadgesList';
import { ProfilePhoto } from '../../components/molecules/ProfilePhoto';
import { UpdaterContext } from '../../store/contexts/updaterContext';

export const UserProfile = ({ route }) => {
    const [selectedOption, setSelectedOption] = useState(0);
    const [userInfo, setUserInfo] = useState();
    const [activities, setActivities] = useState({});
    const [badges, setBadges] = useState([]);
    const { getUserProfile, getActivities } = useContext(
        SocialNetworkProfileContext,
    );
    const { setIsLoading } = useContext(LoadingContext);
    const { shouldUpdate, setShouldUpdate } = useContext(UpdaterContext);
    const { user, isEntity } = useContext(UserContext);
    const { getUserBadges } = useContext(BadgeContext);

    const userId = route?.params?.userId || user._id;

    const isTheSameUser = user._id == userId;
    const displayName = isTheSameUser ? user?.name : userInfo?.username;
    const biography = isTheSameUser ? user?.biography : userInfo?.biography;
    const photo = isTheSameUser ? user?.photo : userInfo?.photo;
    const showActivities = selectedOption == 0;
    const showBadges = selectedOption == 1;

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
        if (!isEntity) {
            const response = await getUserProfile(userId);
            setUserInfo(response);
        }
    };

    const getBadges = async () => {
        if (!isEntity) {
            const response = await getUserBadges(userId);
            setBadges(response);
        }
    };

    useEffect(() => {
        if (shouldUpdate || !userInfo) handleLoadScreenData();
    }, [shouldUpdate]);

    const renderActivityTitle = () => {
        if (isEntity)
            return (
                <Text className="font-ms-semibold text-base self-start">
                    Atividades
                </Text>
            );
        return (
            <TextSwitch
                option1="Atividades"
                option2="Conquistas"
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
            />
        );
    };

    return (
        <ScrollView contentContainerStyle={{ height: '100%' }}>
            <View className="flex-1 items-center mt-8">
                <ProfilePhoto
                    size={'md'}
                    base64={photo}
                    className={'absolute z-50 mt-2'}
                />
                <View className="flex-1 bg-white items-center px-8 py-7 gap-1 mt-12 w-full rounded-3xl">
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
                    {isTheSameUser && (
                        <Text className="font-ms-regular text-black">
                            {user.email}
                        </Text>
                    )}
                    {!isEntity && (
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
                    )}
                    <DescriptionBox title="Biografia" description={biography} />
                    {renderActivityTitle()}
                    {showActivities && (
                        <ActivitiesList activities={activities} />
                    )}
                    {!isEntity && showBadges && (
                        <BadgesList badges={badges} userId={userId} />
                    )}
                </View>
            </View>
        </ScrollView>
    );
};
