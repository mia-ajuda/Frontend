import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { ProfilePhoto } from '../../molecules/ProfilePhoto';
import { LoadingContext } from '../../../store/contexts/loadingContext';
import callService from '../../../services/callService';
import userService from '../../../services/User';
import formatPhone from '../../../utils/formatPhone';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

export const UserCard = ({ userId }) => {
    const navigation = useNavigation();
    const { setIsLoading } = useContext(LoadingContext);
    const [user, setUser] = useState();
    const [updateData, setUpdateData] = useState(true);

    const handlenavigate = (userId) => {
        navigation.navigate('socialUserProfile', {
            userId,
        });
    };

    useEffect(() => {
        async function fetchUserInfo() {
            setIsLoading(true);
            const userTemp = await callService(userService, 'getAnyUser', [
                userId,
            ]);

            setUser(userTemp);
            setIsLoading(false);
        }
        if (updateData) {
            fetchUserInfo();
            setUpdateData(false);
        }
    }, [updateData]);

    const textPattern = 'text-black text-sm';
    return (
        <Pressable
            className="border border-[#D2D2D2] px-4 py-4 rounded-xl flex-row items-center"
            android_ripple={{ color: '#D2D2D2' }}
            onPress={() => handlenavigate(user._id)}
        >
            {user && (
                <Fragment>
                    <ProfilePhoto size={'md'} base64={user.photo} />
                    <View className="ml-3">
                        <Text
                            className={`font-ms-bold ${textPattern}`}
                            numberOfLines={1}
                        >
                            {user.name}
                        </Text>
                        <Text
                            className={`font-ms-regular ${textPattern}`}
                            numberOfLines={1}
                        >
                            {formatPhone(user.phone)}
                        </Text>
                        <Text
                            className={`font-ms-regular ${textPattern}`}
                            numberOfLines={1}
                        >
                            {user.email}
                        </Text>
                    </View>
                    <View className="absolute right-0">
                        <Icon name="chevron-right" size={42} color="#353535" />
                    </View>
                </Fragment>
            )}
        </Pressable>
    );
};
