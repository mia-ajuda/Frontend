import React from 'react';
import { Text, View, TextInput } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

export const Input = ({
    value,
    setValue,
    placeholder,
    mask,
    label,
    disabled = false,
    error,
    errorMessage,
    type,
    className,
    lines = 1,
    maxLength,
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

    const style = disabled ? disabledStyle : enabledStyle;
    const inputProps = {
        value: value,
        onChangeText: setValue,
        placeholder: placeholder,
        editable: !disabled,
    };

    return (
        <View className={className}>
            <Text className="text-sm font-ms-semibold text-black my-1">
                {label}
            </Text>
            {mask && (
                <TextInputMask
                    className={style}
                    type={mask}
                    options={selectedMaskOption}
                    {...inputProps}
                />
            )}
            {!mask && (
                <TextInput
                    className={style}
                    keyboardType={type}
                    numberOfLines={lines}
                    multiline={lines > 1}
                    maxLength={maxLength}
                    {...inputProps}
                />
            )}
            {!error && maxLength && (
                <Text className="ml-auto font-ms-regular text-xs">
                    {value.length}/{maxLength}
                </Text>
            )}
            {error && (
                <Text className="text-sm text-red-600">{errorMessage}</Text>
            )}
        </View>
    );
};
