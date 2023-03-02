import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { showCustomHeader } from '../../../../utils/showCustomHeader';
import SocialNetworkProfilePage from '../../../../pages/FindUsersPages/SocialNetworkProfile';
import FollowersFollowingPage from '../../../../pages/FindUsersPages/Followers_Following';
import FindUsers from '../../../../pages/FindUsersPages';

const Stack = createStackNavigator();

export const SocialNetworkRoutes = () => {
    return (
        <>
            <Stack.Screen
                name="socialUserProfile"
                component={SocialNetworkProfilePage}
                options={{ title: 'Detalhes' }}
            />
            <Stack.Screen
                name="followersFollowingPage"
                component={FollowersFollowingPage}
                options={{ title: 'Usuários' }}
            />

            <Stack.Screen
                name="searchUsers"
                component={FindUsers}
                options={({ navigation }) => ({
                    ...showCustomHeader('Procurar Usuários', navigation),
                })}
            />
        </>
    )
}
