import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { FeedbackScreen } from '../../../../pages/Feedback';
import headerStyle from '../../MainNavigationStyles/MainStackHeaderStyle';

const Stack = createStackNavigator();

export const FeedbackRoutes = () => {
    return (
        <>
            <Stack.Screen
                name="feedbacks"
                options={headerStyle}
                component={FeedbackScreen}
            />
        </>
    );
};
