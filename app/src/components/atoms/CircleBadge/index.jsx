import React from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';

export const CircleBadge = ({
    rank,
    badgeIcon,
    isHidden = false,
    size = 'sm',
}) => {
    const iconBackgrounds = {
        1: 'bg-first-rank',
        2: 'bg-second-rank',
        3: 'bg-thirt-rank',
    };

    const sizes = {
        sm: {
            width: 'w-12',
            icon: 34,
        },
        md: {
            width: 'w-16',
            icon: 48,
        },
    };

    const selectedSize = sizes[size];

    const selectedIconBackground = isHidden ? 'bg-gray' : iconBackgrounds[rank];
    return (
        <View
            className={`rounded-full p-2 ${selectedIconBackground} ${selectedSize.width}`}
        >
            <Icon
                name={badgeIcon}
                color={'white'}
                size={selectedSize.icon}
                type={isHidden ? 'material-community' : 'material'}
            />
        </View>
    );
};
