import React, { useCallback, useContext, useState } from 'react';
import { View } from 'react-native';
import ProfileList from '../../components/profileList';
import { SocialNetworkProfileContext } from '../../store/contexts/socialNetworkProfileContext';
import { LoadingContext } from '../../store/contexts/loadingContext';
import { NotFound } from '../../components/organisms/NotFound';
import { useFocusEffect } from '@react-navigation/core';

export const UserList = ({ route, navigation }) => {
    const { userId, followType } = route.params;
    const { getFollows } = useContext(SocialNetworkProfileContext);
    const { setIsLoading } = useContext(LoadingContext);
    const [userList, setUserList] = useState([]);

    const notFoundMessages = {
        following: 'segue',
        followers: 'é seguido por',
    };
    const hasUsers = userList?.length > 0;

    const getUserList = async () => {
        setIsLoading(true);
        const response = await getFollows(followType, userId);
        setIsLoading(false);
        setUserList(response);
    };

    useFocusEffect(
        useCallback(() => {
            getUserList();
        }, [navigation]),
    );

    return (
        <View className="flex-1 flex-col w-full bg-background px-4 py-6">
            {hasUsers && <ProfileList usersProfile={userList || []} />}
            {!hasUsers && (
                <NotFound
                    body={`Este usuário não ${notFoundMessages[followType]} nenhum outro usuário`}
                />
            )}
        </View>
    );
};
