import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../../../pages/profile/ListProfile';
import EditProfile from '../../../pages/profile/EditProfile';
import colors from '../../../../assets/styles/colorVariables';
import fonts from '../../../../assets/styles/fontVariable';
import { Image } from 'react-native';
import backImage from '../../../../assets/images/back.png';

const ProfileStack = createStackNavigator();
const headerStyle = {
    headerBackImage: () => (
        <Image
            source={backImage}
            style={{
                flex: 1,
                resizeMode: 'contain',
                width: 10,
                marginLeft: 5,
            }}
        />
    ),
    headerStyle: {
        height: 90,
        backgroundColor: colors.primary,
        elevation: 0,
    },
    headerTitleStyle: {
        ...fonts.title,
        color: colors.light,
        fontFamily: 'montserrat-medium',
        marginHorizontal: 30,
    },
    headerTintColor: colors.light,
    headerTitleAlign: 'center',
};
const ProfileNavigation = () => (
    <ProfileStack.Navigator screenOptions={headerStyle}>
        <ProfileStack.Screen name="Perfil" component={Profile} />
        <ProfileStack.Screen
            name="EditProfile"
            component={EditProfile}
            options={() => ({
                title: 'Editar Perfil',
            })}
        />
    </ProfileStack.Navigator>
);

export default ProfileNavigation;
