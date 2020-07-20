import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import getPastimeFrom from '../../utils/getPastTime';
import colors from '../../../assets/styles/colorVariables';
import styles from './styles';

export default function NotificationCard({
    notificationType,
    notificationTitle,
    notificationBody,
    notificationDate,
    dateNow,
}) {
    const [notificationTime, setNotificationTime] = useState('');

    useEffect(() => {
        const notificationPastTime = getPastimeFrom(notificationDate);
        setNotificationTime(notificationPastTime);
    }, [dateNow]);

    const renderCardIcon = () => {
        let iconName;
        let iconBackground;

        switch (notificationType) {
            case 'ajudaRecebida':
                iconName = 'bell';
                iconBackground = colors.primary;
                break;

            case 'ajudaAceita':
                iconName = 'bell';
                iconBackground = colors.primary;
                break;

            case 'ajudaFinalizada':
                iconName = 'check';
                iconBackground = colors.success;
                break;

            case 'ajudaExpirada':
                iconName = 'exclamation';
                iconBackground = colors.danger;
                break;
        }

        return (
            <View
                style={[
                    styles.iconContent,
                    { backgroundColor: iconBackground },
                ]}>
                <Icon
                    size={15}
                    name={iconName}
                    type="font-awesome"
                    color={colors.light}
                />
            </View>
        );
    };

    return (
        <View style={styles.cardContainer}>
            <View style={styles.info}>
                <Text style={styles.title} numberOfLines={2}>
                    {notificationTitle}
                </Text>
                <Text numberOfLines={2}>{notificationBody}</Text>
                <Text style={styles.time}>{notificationTime}</Text>
            </View>
            {renderCardIcon()}
        </View>
    );
}
