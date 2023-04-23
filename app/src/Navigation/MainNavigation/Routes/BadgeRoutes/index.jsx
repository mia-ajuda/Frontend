import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Badges } from '../../../../pages/Badges';

const Stack = createStackNavigator();

export const BadgeRoutes = () => {
    return (
        <>
            <Stack.Screen name="badges" component={Badges} />
        </>
    );
};
