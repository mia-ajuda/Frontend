import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import headerStyle from '../../MainNavigationStyles/MainStackHeaderStyle';
import { UserProfile } from '../../../../pages/UserProfile';
import { EditProfile } from '../../../../pages/EditProfile';

const Stack = createStackNavigator();

export const ProfileRoutes = () => {
    return (
        <>
            <Stack.Screen
                name="profile"
                component={UserProfile}
                options={(props) => {
                    return headerStyle({
                        ...props,
                        iconType: 'drawer',
                        buttonProps: {
                            visible: true,
                            text: 'Editar perfil',
                            onPress: () =>
                                props.navigation.navigate('editProfile'),
                        },
                    });
                }}
            />
            <Stack.Screen name="editProfile" component={EditProfile} />
        </>
    );
};
