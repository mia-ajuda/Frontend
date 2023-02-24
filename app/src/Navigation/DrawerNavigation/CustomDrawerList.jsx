import { DrawerItem } from '@react-navigation/drawer';
import {
    CommonActions,
    DrawerActions,
    useLinkBuilder,
} from '@react-navigation/native';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import colors from '../../../assets/styles/colorVariables';

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

    const firstSectionScreens = ["Notifications", "Home", "Activities"]
    const secondSectionScreens = ["Profile", "Help"]


    const firstSectionRoutes = state.routes.filter(route => firstSectionScreens.includes(route.name))
    const secondSectionRoutes = state.routes.filter(route => secondSectionScreens.includes(route.name))

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
            {firstSectionRoutes.map(mapRoutes)}
            <View style={styles.divider}/>
            {secondSectionRoutes.map((route, i) => mapRoutes(route, i + firstSectionRoutes.length))}
        </View>
    );
}

const styles = StyleSheet.create({
    drawerListContainer: {
        flex: 1,
        paddingVertical: 32,
        marginBottom: 16
    },
    divider: {
        borderBottomColor: colors.dark,
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginVertical: 8,
        marginHorizontal: 24,
        opacity: 0.3
    }
})
