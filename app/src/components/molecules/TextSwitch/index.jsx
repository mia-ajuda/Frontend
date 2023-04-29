import React from 'react';
import { View } from 'react-native';
import { TextSwitchButton } from '../../atoms/TextSwitchButton';

export const TextSwitch = ({
    option1,
    option2,
    selectedOption,
    setSelectedOption,
    darker = false,
}) => {
    const background = darker ? 'bg-gray' : 'bg-background';
    return (
        <View className={`p-1 flex-row ${background} rounded-full`}>
            <TextSwitchButton
                text={option1}
                onPress={() => setSelectedOption(0)}
                isSelected={selectedOption == 0}
            />
            <TextSwitchButton
                text={option2}
                onPress={() => setSelectedOption(1)}
                isSelected={selectedOption == 1}
            />
        </View>
    );
};
