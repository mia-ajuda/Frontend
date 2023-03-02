import React from 'react'
import Profile from '../../../../pages/Profile/UserProfile';
import EditNameField from '../../../../pages/Profile/EditProfileFields/NameField';
import EditCepField from '../../../../pages/Profile/EditProfileFields/CEPField';
import EditPhoneField from '../../../../pages/Profile/EditProfileFields/PhoneFIeld';
import { createStackNavigator } from '@react-navigation/stack';
import headerStyle from '../../MainNavigationStyles/MainStackHeaderStyle';

const Stack = createStackNavigator();

export const ProfileRoutes = () => {
    return (
        <>
            <Stack.Screen
                name="profile"
                component={Profile}
                options={headerStyle}
            />
            <Stack.Screen
                name="editNameField"
                component={EditNameField}
            />
            <Stack.Screen
                name="editCEPField"
                component={EditCepField}
            />
            <Stack.Screen
                name="editPhoneField"
                component={EditPhoneField}
            />
        </>
    )
}
