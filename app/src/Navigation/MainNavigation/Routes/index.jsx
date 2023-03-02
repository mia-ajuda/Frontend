import React, { Fragment } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import headerStyle from '../MainNavigationStyles/MainStackHeaderStyle';
import { showCustomHeader } from '../../../utils/showCustomHeader';
import NotificationPage from '../../../pages/Notification/index';
import { ProfileRoutes } from './ProfileRoutes';
import { SocialNetworkRoutes } from './SocialNetworkRoutes';
import { ActivitiesRoutes } from './ActivitiesRoutes';
import { MoreInfoRoutes } from './MoreInfoRoutes';
import { MapRoutes } from './MapRoutes';

const Stack = createStackNavigator();

const othersRoutes = [MapRoutes,
    MoreInfoRoutes,
    ActivitiesRoutes,
    ProfileRoutes,
    SocialNetworkRoutes,]

const Routes = ({ initialRouteName }) => (
    <Stack.Navigator
        initialRouteName={initialRouteName}
        screenOptions={headerStyle}
    >
        <Stack.Screen
            name="notifications"
            component={NotificationPage}
            options={({ navigation }) => ({
                title: 'Notificações',
                ...showCustomHeader('Notificações', navigation),
            })}
        />
        {othersRoutes.map((routes, i) => <Fragment key={i}>
            {routes()}
        </Fragment>)
        }
    </Stack.Navigator>
);

export default Routes;
