import React, { useContext, useEffect, useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { TextSwitch } from '../../components/molecules/TextSwitch';
import { SocialNetworkProfileContext } from '../../store/contexts/socialNetworkProfileContext';
import { LoadingContext } from '../../store/contexts/loadingContext';
import { UserContext } from '../../store/contexts/userContext';
import { FollowCount } from '../../components/molecules/FollowCount';
import HistoricCard from '../../components/HistoricCard';

export const UserProfile = ({ navigation, route }) => {
    const [selectedOption, setSelectedOption] = useState(1);
    const { userId } = route.params;
    const [userInfo, setUserInfo] = useState();
    const [activities, setActivities] = useState([]);
    const { getUserProfile, getActivities } = useContext(
        SocialNetworkProfileContext,
    );
    const { setIsLoading } = useContext(LoadingContext);
    const { user } = useContext(UserContext);

    const isFollowing = true || userInfo?.following.includes(user._id);
    const showActivities = selectedOption == 1;
    const showConquers = selectedOption == 0;

    const handleLoadScreenData = async () => {
        setIsLoading(true);

        Promise.all([getActivitiesInfo(), getUserInfo()]).then(() =>
            setIsLoading(false),
        );
    };
    const getActivitiesInfo = async () => {
        const response = await getActivities(userId);
        setIsLoading(false);
        console.log(Object.keys(response));
        setActivities([...response.helps, ...response.offers]);
    };

    const getUserInfo = async () => {
        setIsLoading(true);
        const response = await getUserProfile(userId);
        setIsLoading(false);
        setUserInfo(response);
    };

    const imageSource = user.photo
        ? {
              uri: `data:image/png;base64,${user.photo}`,
          }
        : require('../../../assets//images/noImage.png');

    useEffect(() => {
        handleLoadScreenData();
    }, []);

    return (
        <View className="items-center mt-10">
            <Image
                source={imageSource}
                className="w-16 h-16 rounded-full absolute z-50"
            />
            <View className="bg-white items-center px-8 py-7 gap-1 h-full mt-10">
                <Text className="font-bold text-lg" numberOfLines={1}>
                    {userInfo?.username}
                </Text>
                {isFollowing && (
                    <Text className="text-slate-400 font-light">
                        Segue você
                    </Text>
                )}
                <View className="flex-row w-full items-center gap-x-4 my-1">
                    <FollowCount type="followers" count={1} />
                    <FollowCount type="following" count={2} />
                </View>
                <TextSwitch
                    option1="Conquistas"
                    option2="Atividades"
                    selectedOption={selectedOption}
                    setSelectedOption={setSelectedOption}
                />
                <ScrollView>
                    {showActivities &&
                        activities.map((activity) => (
                            <HistoricCard
                                key={activity._id}
                                object={activity}
                                isRiskGroup={false}
                            />
                        ))}
                </ScrollView>
            </View>
        </View>
    );
};
