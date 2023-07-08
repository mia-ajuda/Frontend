import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Timeline } from '../../../../pages/TimeLine';
import headerStyle from '../../MainNavigationStyles/MainStackHeaderStyle';

const Stack = createStackNavigator();

export const TimelineRoutes = () => {
    return (
        <>
            <Stack.Screen
                name="timeline"
                options={headerStyle}
                component={Timeline}
            />
        </>
    );
};
