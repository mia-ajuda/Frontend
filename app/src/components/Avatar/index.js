import React from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import colors from '../../../assets/styles/colorVariables';
import styles from './styles';

export default function Avatar({ help, iconType }) {
    const isRiskGroup = help ? !!help.user.riskGroup.length : false;
    const iconColor = isRiskGroup ? colors.danger : colors.primary;

    return (
        <View style={styles.container}>
            <Icon
                name={iconType}
                type="font-awesome"
                size={45}
                color={iconColor}
            />
        </View>
    );
}
