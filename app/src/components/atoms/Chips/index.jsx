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
    customStyle,
    disabled = false,
}) => {
    const [isSelected, setIsSelected] = useState(false);
    const chipColor = isSelected ? 'bg-secondary-500 border-0' : 'bg-white';
    const elevatedStyle = elevated && 'shadow shadow-black';
    const disabledStyle = disabled && 'opacity-30';
    const shouldIconAppears =
        icon && ((type == 'filter' && isSelected) || type == 'button');

    const variantsAction = {
        button: () => onPress(),
        filter: () => {
            onPress();
            setIsSelected(!isSelected);
        },
    };

    return (
        <Pressable
            onPress={variantsAction[type]}
            className={`px-3 py-2 ${customStyle} ${chipColor} ${disabledStyle} ${elevatedStyle} flex-row rounded-lg items-center`}
            android_ripple={{
                color: tailwindConfig.theme.extend.colors.gray.DEFAULT,
            }}
            disabled={disabled}
        >
            {shouldIconAppears && icon && <Icon name={icon} size={16} />}
            <Text className="font-ms-semibold text-xs">{title}</Text>
        </Pressable>
    );
};
