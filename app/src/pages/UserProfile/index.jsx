import React, { useContext, useEffect, useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { TextSwitch } from '../../components/molecules/TextSwitch';
import { SocialNetworkProfileContext } from '../../store/contexts/socialNetworkProfileContext';
import { LoadingContext } from '../../store/contexts/loadingContext';
import { FollowCount } from '../../components/molecules/FollowCount';
import { ActivityCard } from '../../components/organisms/ActivityCard';
import { NotFound } from '../../components/organisms/NotFound';
import { RoundedFullButton } from '../../components/atoms/RoundedFullButton';
import { UpdaterContext } from '../../store/contexts/updaterContext';

export const UserProfile = ({ route }) => {
    const [selectedOption, setSelectedOption] = useState(1);
    const [userInfo, setUserInfo] = useState();
    const [activities, setActivities] = useState({});
    const { getUserProfile, getActivities, followUser, unfollowUser } =
        useContext(SocialNetworkProfileContext);
    const { setIsLoading } = useContext(LoadingContext);
    const { shouldUpdate, setShouldUpdate } = useContext(UpdaterContext);

    const { userId } = route.params;

    const showActivities = selectedOption == 1;
    const activitiesTypes = Object.keys(activities);
    const activeSwicth = false; //Will be enable when we have the conquers
    const showBiography = false; //Will be enable when we have the biography
    const followButtonProps = {
        variant: userInfo?.isFollowing ? 'secondary' : 'primary',
        text: userInfo?.isFollowing ? 'Seguindo' : 'Seguir',
    };

    const handleFollowButton = async () => {
        setIsLoading(true);
        userInfo?.isFollowing
            ? await followUser(userInfo._id)
            : await unfollowUser(userInfo._id);
        setShouldUpdate(true);
    };

    const handleLoadScreenData = async () => {
        setIsLoading(true);
        Promise.all([getActivitiesInfo(), getUserInfo()]).then(() => {
            setIsLoading(false);
            setShouldUpdate(false);
        });
    };

    const getActivitiesInfo = async () => {
        const response = await getActivities(userId);
        setActivities(response);
    };

    const getUserInfo = async () => {
        const response = await getUserProfile(userId);
        setUserInfo(response);
    };

    const imageSource = userInfo?.photo
        ? {
              uri: `data:image/png;base64,${userInfo?.photo}`,
          }
        : require('../../../assets//images/noImage.png');

    const renderActivies = () => {
        const activitiesCount = activitiesTypes.reduce(
            (currentValue, newValue) => {
                return currentValue + activities[newValue].length;
            },
            0,
        );
        return activitiesCount > 0 ? (
            <ScrollView
                className="w-full max-h-44"
                horizontal
                contentContainerStyle={{
                    alignItems: 'center',
                }}
            >
                {Object.keys(activities).map((activitieName) =>
                    activities[activitieName].map((activitie, i) => (
                        <ActivityCard
                            key={activitie._id}
                            variant={activitieName.slice(
                                0,
                                activitieName.length - 1,
                            )}
                            id={activitie._id}
                            count={i + 1}
                            title={activitie.title}
                            description={activitie.description}
                            badges={activitie.categories}
                            distance={activitie.distance}
                        />
                    )),
                )}
            </ScrollView>
        ) : (
            <NotFound title="Usuário não possui atividades" size="small" />
        );
    };

    useEffect(() => {
        if (shouldUpdate || !userInfo) handleLoadScreenData();
    }, [shouldUpdate]);

    return (
        <View className="flex-1 items-center mt-8">
            <View className="absolute right-2">
                <RoundedFullButton
                    variant={followButtonProps.variant}
                    onPress={handleFollowButton}
                    text={followButtonProps.text}
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
                    {userInfo?.username}
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

                {showBiography && (
                    <View className="w-full">
                        <Text className="absolute text-regular bg-white mx-1 px-1 font-ms-bold z-10 my-2 text-black">
                            Biografia
                        </Text>
                        <View className="border border-background py-4 px-2 relative rounded-lg w-full h-24 my-4 text-black">
                            <Text
                                className="text-xs font-ms-regular"
                                numberOfLines={4}
                            >
                                Estou passando por necessidade e preciso de
                                alguns suprimentos básicos como: Alimentos não
                                perecíveis e kits de higiêne.
                            </Text>
                        </View>
                    </View>
                )}
                {activeSwicth && (
                    <TextSwitch
                        option1="Conquistas"
                        option2="Atividades"
                        selectedOption={selectedOption}
                        setSelectedOption={setSelectedOption}
                    />
                )}
                <View className="flex-1 w-full">
                    {!activeSwicth && (
                        <Text className="self-start text-base font-ms-semibold text-black">
                            Atividades
                        </Text>
                    )}
                    {showActivities && renderActivies()}
                </View>
            </View>
        </View>
    );
};
