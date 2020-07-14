import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../../../pages/profile/ListProfile';
import headerStyle from '../MainNavigationStyles/MainStackHeaderStyle';
import EditNameField from '../../../pages/profile/EditProfileFields/NameField';
import EditCEPField from '../../../pages/profile/EditProfileFields/CepField';
import EditPhoneField from '../../../pages/profile/EditProfileFields/PhoneField';

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
