import React from 'react'
import Profile from '../../../../pages/Profile/UserProfile';
import EditNameField from '../../../../pages/Profile/EditProfileFields/NameField';
import EditCepField from '../../../../pages/Profile/EditProfileFields/CEPField';
import EditPhoneField from '../../../../pages/Profile/EditProfileFields/PhoneFIeld';
import { createStackNavigator } from '@react-navigation/stack';
import { showCustomHeader } from '../../../../utils/showCustomHeader';

const Stack = createStackNavigator();

export const ProfileRoutes = () => {
    return (
        <>
            <Stack.Screen
                name="profile"
                component={Profile}
                options={({ navigation }) => ({
                    ...showCustomHeader('Perfil', navigation),
                })}
            />
            <Stack.Screen
                name="editNameField"
                component={EditNameField}
                options={{
                    title: 'Editar Nome',
                }}
            />
            <Stack.Screen
                name="editCEPField"
                component={EditCepField}
                options={{
                    title: 'Editar CEP',
                }}
            />
            <Stack.Screen
                name="editPhoneField"
                component={EditPhoneField}
                options={{
                    title: 'Editar Telefone',
                }}
            />
        </>
    )
}
