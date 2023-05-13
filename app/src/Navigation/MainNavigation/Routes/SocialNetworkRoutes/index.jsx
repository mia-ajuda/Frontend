import React, { useContext, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FindUsers from '../../../../pages/FindUsersPages';
import headerStyle from '../../MainNavigationStyles/MainStackHeaderStyle';
import { UserProfile } from '../../../../pages/UserProfile';
import { UserList } from '../../../../pages/UserList';
import { SocialNetworkProfileContext } from '../../../../store/contexts/socialNetworkProfileContext';

const Stack = createStackNavigator();

export const SocialNetworkRoutes = () => {
    const [userInfo, setUserInfo] = useState();
    const [shouldUpdate, setShouldUpdate] = useState(false);
    const [buttonProps, setButtonProps] = useState();
    const { getUserProfile, followUser, unfollowUser } = useContext(
        SocialNetworkProfileContext,
    );

    const handleFollowButton = async () => {
        userInfo?.isFollowing
            ? await followUser(userInfo._id)
            : await unfollowUser(userInfo._id);

        setShouldUpdate(true);
    };

    const myRequestButtonProps = async (userId) => {
        const response = await getUserProfile(userId);
        const { isFollowing } = response;
        const newProps = {
            visible: true,
            variant: isFollowing ? 'secondary' : 'primary',
            text: isFollowing ? 'Seguindo' : 'Seguir',
            onPress: handleFollowButton,
        };
        setUserInfo(response);
        setButtonProps(newProps);
    };

    return (
        <>
            <Stack.Screen
                name="socialUserProfile"
                options={(props) => {
                    const userId = props.route?.params?.userId;
                    myRequestButtonProps(userId);
                    return headerStyle({
                        ...props,
                        buttonProps,
                        iconType: 'back',
                    });
                }}
            >
                {({ route, navigation }) => {
                    return (
                        <UserProfile
                            route={route}
                            navigation={navigation}
                            shouldUpdate={shouldUpdate}
                            setShouldUpdate={setShouldUpdate}
                        />
                    );
                }}
            </Stack.Screen>

            <Stack.Screen
                name="searchUsers"
                component={FindUsers}
                options={headerStyle}
            />
            <Stack.Screen name="userList" component={UserList} />
        </>
    );
};
