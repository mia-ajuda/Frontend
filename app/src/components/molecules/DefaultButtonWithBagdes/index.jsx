import React from 'react';
import { Text, View } from 'react-native';
import { Badge } from 'react-native-elements';
import { DefaultButton } from '../../atoms/DefaultButton';
import styles from '../../../../assets/styles/helpDescription';

export const DefaultButtonWithBadges = ({
    title,
    onPress,
    badgeValue,
    marginTop = '',
    disabled,
}) => {
    return (
        <View className={`${marginTop}`}>
            <DefaultButton
                title={title}
                onPress={onPress}
                disabled={disabled}
            />
            <Badge
                value={<Text style={styles.labelBadge}>{badgeValue}</Text>}
                badgeStyle={[styles.badgeStyle, styles.smallBadge]}
                containerStyle={styles.containerBadge}
            />
        </View>
    );
};
