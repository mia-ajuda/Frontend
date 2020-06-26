import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Main from '../../../pages/Main';
import CreateHelp from '../../../pages/helpPages/createHelp';
import HelpDescription from '../../../pages/helpPages/helpDescription';
import { Image } from 'react-native';
import backImage from '../../../../assets/images/back.png';
import colors from '../../../../assets/styles/colorVariables';
import fonts from '../../../../assets/styles/fontVariable';

const MainStack = createStackNavigator();

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

const MainNavigation = () => (
    <MainStack.Navigator initialRouteName="main" screenOptions={headerStyle}>
        <MainStack.Screen
            name="main"
            component={Main}
            options={{ headerShown: false }}
        />
        <MainStack.Screen
            name="createHelp"
            options={{ title: 'Pedir ajuda' }}
            component={CreateHelp}
        />
        <MainStack.Screen
            name="helpDescription"
            options={({ route }) => ({
                title: route.params.helpTitle,
            })}
            component={HelpDescription}
        />
    </MainStack.Navigator>
);

export default MainNavigation;
