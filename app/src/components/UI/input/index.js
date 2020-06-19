import React from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from './styles';

export default function Input({
    label,
    placeholder,
    change,
    value,
    textarea,
    type,
    valid = true,
    autoComplete,
    keyboard = 'default',
}) {
    let input;
    if (textarea) {
        input = (
            <TextInput
                style={[styles.input, styles.validInput]}
                placeholder="..."
                placeholderTextColor={'#BDBDBD'}
                onChangeText={change}
                value={value}
                numberOfLines={6}
                textAlignVertical="top"
                multiline={true}
                keyboardType={keyboard ? keyboard : 'default'}
                maxLength={300}
            />
        );
    } else if (type === 'password') {
        input = (
            <TextInput
                secureTextEntry
                style={[
                    styles.input,
                    valid ? styles.validInput : styles.invalidInput,
                ]}
                placeholder={placeholder}
                placeholderTextColor={'#BDBDBD'}
                onChangeText={change}
                value={value}
                autoCompleteType={autoComplete ? autoComplete : 'off'}
                keyboardType={keyboard ? keyboard : 'default'}
            />
        );
    } else {
        input = (
            <TextInput
                style={[
                    styles.input,
                    valid ? styles.validInput : styles.invalidInput,
                ]}
                placeholder={placeholder}
                placeholderTextColor={'#BDBDBD'}
                onChangeText={change}
                value={value}
                autoCompleteType={autoComplete ? autoComplete : 'off'}
                keyboardType={keyboard ? keyboard : 'default'}
                maxLength={50}
            />
        );
    }
    return (
        <View>
            <Text style={styles.label}>{label}</Text>
            {input}
        </View>
    );
}
