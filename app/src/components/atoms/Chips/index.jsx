import React, { useState } from 'react';
import { Pressable, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import tailwindConfig from '../../../../tailwind.config';

export const Chips = ({
    title,
    icon,
    onPress,
    elevated = false,
    type,
    color = 'bg-white',
    customStyle,
}) => {
    const [shouldIconAppears, setShouldIconAppears] = useState(type == 'filter' ? false : icon != null);
    const [chipColor, setChipColor] = useState(color);

    const variantsAction = {
        button: () => onPress(),
        filter: () => {
            onPress(),
            setChipColor(
                chipColor == 'bg-white' ? 'bg-primary-contrast' : 'bg-white',
            );
            setShouldIconAppears(!shouldIconAppears);
        },
    };

    return (
        <Pressable
            onPress={variantsAction[type]}
            className={`px-4 py-2 ${
                elevated && 'shadow shadow-black'
            } ${customStyle} ${chipColor} flex-row rounded-lg items-center`}
            android_ripple={{
                color: tailwindConfig.theme.extend.colors.gray.DEFAULT,
            }}
        >
            {shouldIconAppears && icon && <Icon name={icon} size={16} />}
            <Text className="font-ms-bold text-xs">{title}</Text>
        </Pressable>
    );
};
