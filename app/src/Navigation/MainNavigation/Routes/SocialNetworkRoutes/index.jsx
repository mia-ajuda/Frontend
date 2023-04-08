import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FollowersFollowingPage from '../../../../pages/FindUsersPages/Followers_Following';
import FindUsers from '../../../../pages/FindUsersPages';
import headerStyle from '../../MainNavigationStyles/MainStackHeaderStyle';
import { UserProfile } from '../../../../pages/UserProfile';

const Stack = createStackNavigator();

export const SocialNetworkRoutes = () => {
    return (
        <>
            <Stack.Screen name="socialUserProfile" component={UserProfile} />
            <Stack.Screen
                name="followersFollowingPage"
                component={FollowersFollowingPage}
            />

            <Stack.Screen
                name="searchUsers"
                component={FindUsers}
                options={headerStyle}
            />
        </>
    );
};
