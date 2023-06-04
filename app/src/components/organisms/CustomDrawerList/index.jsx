import { CommonActions, DrawerActions } from '@react-navigation/native';
import * as React from 'react';
import { View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Divider } from '../../atoms/Divider';
import { CustomDrawerItem } from '../../molecules/CustomDrawerItem';
import { styles } from './styles';

const sections = [
    ['notificationsDrawer', 'homeDrawer', 'activitiesDrawer', 'feedbackDrawer'],
    ['profileDrawer', 'findUserDrawer', 'helpDrawer'],
];

const setSectionsRoutes = (routes) => {
    let sectionsRoutes = [];
    let initialPosition = 0;
    sections.forEach((sectionList) => {
        sectionsRoutes.push({
            routes: routes.filter((route) => sectionList.includes(route.name)),
            initialPosition,
        });
        initialPosition += sectionsRoutes.slice(-1)[0].routes.length;
    });
    return sectionsRoutes;
};

export default function CustomDrawerItemList({
    state,
    navigation,
    descriptors,
}) {
    const sectionsRoutes = setSectionsRoutes(state.routes);

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
                        : CommonActions.navigate({
                              name: route.name,
                              merge: true,
                          })),
                    target: state.key,
                });
            }
        };

        const { title, drawerLabel, drawerIcon } =
            descriptors[route.key].options;
        const label =
            drawerLabel !== undefined
                ? drawerLabel
                : title !== undefined
                ? title
                : route.name;
        return (
            <CustomDrawerItem
                key={i}
                onPress={onPress}
                icon={drawerIcon}
                label={label}
                isSelected={focused}
            />
        );
    };

    return (
        <View style={styles.drawerListContainer}>
            {sectionsRoutes.map((routeList, i) => {
                return (
                    <View key={i}>
                        {routeList.routes.map((route, index) =>
                            mapRoutes(route, routeList.initialPosition + index),
                        )}
                        {i < sectionsRoutes.length - 1 && (
                            <Divider marginHorizontal={RFValue(16, 640)} />
                        )}
                    </View>
                );
            })}
        </View>
    );
}
