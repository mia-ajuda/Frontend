import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import SocialNetworkProfilePage from '../../../../pages/FindUsersPages/SocialNetworkProfile';
import FollowersFollowingPage from '../../../../pages/FindUsersPages/Followers_Following';
import FindUsers from '../../../../pages/FindUsersPages';
import headerStyle from '../../MainNavigationStyles/MainStackHeaderStyle';

const Stack = createStackNavigator();

export const SocialNetworkRoutes = () => {
    return (
        <>
            <Stack.Screen
                name="socialUserProfile"
                component={SocialNetworkProfilePage}
            />
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
    )
}
