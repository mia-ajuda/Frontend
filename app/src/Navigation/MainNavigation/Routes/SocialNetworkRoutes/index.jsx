import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FindUsers from '../../../../pages/FindUsersPages';
import headerStyle from '../../MainNavigationStyles/MainStackHeaderStyle';
import { UserProfile } from '../../../../pages/UserProfile';
import { UserList } from '../../../../pages/UserList';

const Stack = createStackNavigator();

export const SocialNetworkRoutes = () => {
    return (
        <>
            <Stack.Screen name="socialUserProfile" component={UserProfile} />

            <Stack.Screen
                name="searchUsers"
                component={FindUsers}
                options={headerStyle}
            />
            <Stack.Screen name="userList" component={UserList} />
        </>
    );
};
