import React, { useContext, useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { TextSwitch } from '../../components/molecules/TextSwitch';
import { SocialNetworkProfileContext } from '../../store/contexts/socialNetworkProfileContext';
import { LoadingContext } from '../../store/contexts/loadingContext';
import { UserContext } from '../../store/contexts/userContext';
import { FollowCount } from '../../components/molecules/FollowCount';

export const UserProfile = ({ navigation, route }) => {
    const [selectedOption, setSelectedOption] = useState(0);
    const { userId } = route.params;
    const [userInfo, setUserInfo] = useState();
    const { getUserProfile } = useContext(SocialNetworkProfileContext);
    const { setIsLoading } = useContext(LoadingContext);
    const { user } = useContext(UserContext);

    const isFollowing = true || userInfo?.following.includes(user._id);

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
        getUserInfo();
    }, []);

    return (
        <View className="items-center mt-10">
            <Image
                source={imageSource}
                className="w-16 h-16 rounded-full absolute z-50"
            />
            <View className="bg-white items-center px-8 py-7 gap-1 h-full mt-10">
                <Text className="font-bold text-lg">{userInfo?.username}</Text>
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
            </View>
        </View>
    );
};
