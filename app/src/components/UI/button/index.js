import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from './styles';

export default function Button({
    title,
    press,
    type,
    large,
    disabled = false,
}) {
    let btn;
    const isLarge = large ? { width: '100%' } : { minWidth: '35%' };

    switch (type) {
        case 'white':
            btn = (
                <TouchableOpacity
                    disabled={disabled}
                    style={[isLarge, styles.btnWhite]}
                    onPress={press}>
                    <Text style={styles.textWhite}>{title}</Text>
                </TouchableOpacity>
            );
            break;
        case 'danger':
            btn = (
                <TouchableOpacity
                    disabled={disabled}
                    style={[isLarge, styles.btnDanger]}
                    onPress={press}>
                    <Text style={styles.textDanger}>{title}</Text>
                </TouchableOpacity>
            );
            break;
        case 'warning':
            btn = (
                <TouchableOpacity
                    disabled={disabled}
                    style={[isLarge, styles.btnWarning]}
                    onPress={press}>
                    <Text style={styles.textWarning}>{title}</Text>
                </TouchableOpacity>
            );
            break;
        case 'notSelected':
            btn = (
                <TouchableOpacity
                    disabled={disabled}
                    style={[isLarge, styles.btnNotSelected]}
                    onPress={press}>
                    <Text style={styles.textNotSelected}>{title}</Text>
                </TouchableOpacity>
            );
            break;
        default:
        case 'default':
            btn = (
                <TouchableOpacity
                    disabled={disabled}
                    style={[isLarge, styles.btnDefault]}
                    onPress={press}>
                    <Text style={styles.textDefault}>{title}</Text>
                </TouchableOpacity>
            );
            break;
    }

    if (disabled) {
        btn = (
            <TouchableOpacity
                activeOpacity={1.0}
                style={[isLarge, styles.btnDisabled]}>
                <Text style={styles.textDisabled}>{title}</Text>
            </TouchableOpacity>
        );
    }

    return btn;
}
