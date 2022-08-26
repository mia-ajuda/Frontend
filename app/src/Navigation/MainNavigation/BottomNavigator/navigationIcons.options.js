import React from 'react';
import navigationIcons from './navigationIcons';
import { Icon } from 'react-native-elements';
import { Image } from 'react-native';

const TabBarIconConfig = (focused, route) => {
    if (route.name == 'main') {
        const activeIcon = navigationIcons[route.name].active.icon;
        const inactiveIcon = navigationIcons[route.name].inactive.icon;

        const activeIconStyle = navigationIcons[route.name].active.size;
        const inactiveIconStyle = navigationIcons[route.name].inactive.size;

        return (
            <Image
                source={focused ? activeIcon : inactiveIcon}
                style={focused ? activeIconStyle : inactiveIconStyle}
            />
        );
    }
    const iconName = navigationIcons[route.name].icon;
    const activeConfig = navigationIcons[route.name].active;
    const inactiveConfig = navigationIcons[route.name].inactive;
    return (
        <Icon
            {...(focused ? activeConfig : inactiveConfig)}
            size={20}
            name={iconName}
            type="font-awesome"
        />
    );
};

export default TabBarIconConfig;
