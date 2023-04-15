import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import ProfileList from '../../components/profileList';
import { SocialNetworkProfileContext } from '../../store/contexts/socialNetworkProfileContext';
import { LoadingContext } from '../../store/contexts/loadingContext';
import { UpdaterContext } from '../../store/contexts/updaterContext';
import { NotFound } from '../../components/organisms/NotFound';

export const UserList = ({ route }) => {
    const { userId, followType } = route.params;
    const { getFollows } = useContext(SocialNetworkProfileContext);
    const { shouldUpdate } = useContext(UpdaterContext);
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

    useEffect(() => {
        getUserList();
    }, [shouldUpdate]);
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
