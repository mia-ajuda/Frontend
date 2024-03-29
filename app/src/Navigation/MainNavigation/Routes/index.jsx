import React, { Fragment } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import headerStyle from '../MainNavigationStyles/MainStackHeaderStyle';
import NotificationPage from '../../../pages/Notification/index';
import { ProfileRoutes } from './ProfileRoutes';
import { SocialNetworkRoutes } from './SocialNetworkRoutes';
import { ActivitiesRoutes } from './ActivitiesRoutes';
import { MoreInfoRoutes } from './MoreInfoRoutes';
import { MapRoutes } from './MapRoutes';
import { BadgeRoutes } from './BadgeRoutes';
import { FeedbackRoutes } from './FeedbackRoutes';
import { TimelineRoutes } from './TimelineRoutes';

const Stack = createStackNavigator();

const othersRoutes = [
    MapRoutes,
    MoreInfoRoutes,
    ActivitiesRoutes,
    ProfileRoutes,
    SocialNetworkRoutes,
    TimelineRoutes,
    BadgeRoutes,
    FeedbackRoutes,
];

const Routes = ({ initialRouteName }) => (
    <Stack.Navigator
        initialRouteName={initialRouteName}
        screenOptions={(props) => headerStyle({ ...props, iconType: 'back' })}
    >
        <Stack.Screen
            name="notifications"
            component={NotificationPage}
            options={headerStyle}
        />
        {othersRoutes.map((routes, i) => (
            <Fragment key={i}>{routes()}</Fragment>
        ))}
    </Stack.Navigator>
);

export default Routes;
