import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../../../pages/Profile/UserProfile';
import headerStyle from '../MainNavigationStyles/MainStackHeaderStyle';
import EditNameField from '../../../pages/Profile/EditProfileFields/NameFIeld';
import EditCEPField from '../../../pages/Profile/EditProfileFields/CEPField';
import EditPhoneField from '../../../pages/Profile/EditProfileFields/PhoneFIeld';

const Stack = createStackNavigator();

const ProfileNavigation = () => (
    <Stack.Navigator screenOptions={headerStyle}>
        <Stack.Screen name="Perfil" component={Profile} />
        <Stack.Screen
            name="EditNameField"
            component={EditNameField}
            options={{
                title: 'Editar Nome',
            }}
        />
        <Stack.Screen
            name="EditCEPField"
            component={EditCEPField}
            options={{
                title: 'Editar CEP',
            }}
        />
        <Stack.Screen
            name="EditPhoneField"
            component={EditPhoneField}
            options={{
                title: 'Editar Telefone',
            }}
        />
    </Stack.Navigator>
);

export default ProfileNavigation;
