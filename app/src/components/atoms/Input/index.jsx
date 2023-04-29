import React from 'react';
import { Text, View } from 'react-native';
import { TextInput } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

export const Input = ({
    value,
    setValue,
    placeholder,
    mask,
    label,
    disabled = false,
}) => {
    const maskOptions = {
        datetime: {
            format: 'DD/MM/YYYY',
        },
        'cel-phone': {
            maskType: 'BRL',
            withDDD: true,
            dddMask: '(99) ',
        },
    };

    const selectedMaskOption = (mask && maskOptions[mask]) || {};

    const disabledStyle =
        'border border-gray rounded-md bg-background py-2 px-4 text-black font-ms-medium';

    const enabledStyle =
        'border border-gray rounded-md bg-white py-2 px-4 text-black font-ms-medium';

    const className = disabled ? disabledStyle : enabledStyle;
    const inputProps = {
        value: value,
        onChangeText: setValue,
        placeholder: placeholder,
        editable: !disabled,
    };

    return (
        <View>
            <Text className="text-sm font-ms-semibold text-black mb-2">
                {label}
            </Text>
            {mask && (
                <TextInputMask
                    className={className}
                    type={mask}
                    options={selectedMaskOption}
                    {...inputProps}
                />
            )}
            {!mask && <TextInput className={className} {...inputProps} />}
        </View>
    );
};
