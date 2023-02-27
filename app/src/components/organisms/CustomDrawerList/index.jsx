import { DrawerItem } from '@react-navigation/drawer';
import {
    CommonActions,
    DrawerActions,
    useLinkBuilder,
} from '@react-navigation/native';
import * as React from 'react';
import { View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Divider } from '../../atoms/Divider';
import { styles } from './styles';


const sections = [["Notifications", "Home", "Activities"], ["Profile", "Help"], ["FindUser"]]

const setSectionsRoutes = (routes) => {
    let sectionsRoutes = [];
    let initialPosition = 0;
    sections.forEach((sectionList) => {
        sectionsRoutes.push({ routes: routes.filter(route => sectionList.includes(route.name)), initialPosition })
        initialPosition += sectionsRoutes.slice(-1)[0].routes.length
    })
    return sectionsRoutes;
}

export default function CustomDrawerItemList({
    state,
    navigation,
    descriptors,
}) {
    const buildLink = useLinkBuilder();

    const focusedRoute = state.routes[state.index] || {};
    const focusedDescriptor = descriptors[focusedRoute.key] || {};
    const focusedOptions = focusedDescriptor.options || {};

    const {
        drawerActiveTintColor,
        drawerInactiveTintColor,
        drawerActiveBackgroundColor,
        drawerInactiveBackgroundColor,
    } = focusedOptions;


    const sectionsRoutes = setSectionsRoutes(state.routes)

    const mapRoutes = (route, i) => {
        const focused = i === state.index;
        const onPress = () => {
            const event = navigation.emit({
                type: 'drawerItemPress',
                target: route.key,
                canPreventDefault: true,
            });

            if (!event.defaultPrevented) {
                navigation.dispatch({
                    ...(focused
                        ? DrawerActions.closeDrawer()
                        : CommonActions.navigate({ name: route.name, merge: true })),
                    target: state.key,
                });
            }
        };

        const {
            title,
            drawerLabel,
            drawerIcon,
            drawerLabelStyle,
            drawerItemStyle,
            drawerAllowFontScaling,
        } = descriptors[route.key].options;

        return (
            <DrawerItem
                key={route.key}
                label={
                    drawerLabel !== undefined
                        ? drawerLabel
                        : title !== undefined
                            ? title
                            : route.name
                }
                icon={drawerIcon}
                focused={focused}
                activeTintColor={drawerActiveTintColor}
                inactiveTintColor={drawerInactiveTintColor}
                activeBackgroundColor={drawerActiveBackgroundColor}
                inactiveBackgroundColor={drawerInactiveBackgroundColor}
                allowFontScaling={drawerAllowFontScaling}
                labelStyle={drawerLabelStyle}
                style={drawerItemStyle}
                to={buildLink(route.name, route.params)}
                onPress={onPress}
            />
        );
    }

    return (
        <View style={styles.drawerListContainer}>
            {sectionsRoutes.map((routeList, i) => {
                return (
                    <View key={i}>
                        {routeList.routes.map((route, index) => mapRoutes(route, routeList.initialPosition + index))}
                        {i < sectionsRoutes.length - 1 && <Divider marginHorizontal={RFValue(16, 640)} />}
                    </View>
                )
            })}
        </View>
    );
}