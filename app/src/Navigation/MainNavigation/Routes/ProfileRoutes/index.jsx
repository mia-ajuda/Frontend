import React, { useContext } from 'react';
import Profile from '../../../../pages/Profile/UserProfile';
import EditNameField from '../../../../pages/Profile/EditProfileFields/NameField';
import EditCepField from '../../../../pages/Profile/EditProfileFields/CEPField';
import EditPhoneField from '../../../../pages/Profile/EditProfileFields/PhoneFIeld';
import { createStackNavigator } from '@react-navigation/stack';
import headerStyle from '../../MainNavigationStyles/MainStackHeaderStyle';
import { UserProfile } from '../../../../pages/UserProfile';
import { UserContext } from '../../../../store/contexts/userContext';

const Stack = createStackNavigator();

export const ProfileRoutes = () => {
    const { isEntity } = useContext(UserContext);
    return (
        <>
            <Stack.Screen
                name="profile"
                component={isEntity ? Profile : UserProfile}
                options={headerStyle}
            />
            <Stack.Screen name="editNameField" component={EditNameField} />
            <Stack.Screen name="editCEPField" component={EditCepField} />
            <Stack.Screen name="editPhoneField" component={EditPhoneField} />
        </>
    );
};
