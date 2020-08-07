import React, { useState, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import getPastimeFrom from '../../utils/getPastTime';
import colors from '../../../assets/styles/colorVariables';
import styles from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import helpService from '../../services/Help';

export default function NotificationCard({
    notificationType,
    notificationTitle,
    notificationBody,
    notificationDate,
    dateNow,
    helpId,
    navigation
}) {
    const [notificationTime, setNotificationTime] = useState('');

    useEffect(() => {
        const notificationPastTime = getPastimeFrom(notificationDate);
        setNotificationTime(notificationPastTime);
    }, [dateNow]);

    async function navigateToHelpPage(){
        const help = await helpService.getHelpById(helpId);
        console.log(help)
        // navigation.navigate('MyRequestHelpDescrition');
    }
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
        <TouchableOpacity style={styles.cardContainer}
            onPress={navigateToHelpPage}>
            <View style={styles.info}>
                <Text style={styles.title} numberOfLines={2}>
                    {notificationTitle}
                </Text>
                <Text numberOfLines={2}>{notificationBody}</Text>
                <Text style={styles.time}>{notificationTime}</Text>
            </View>
            {renderCardIcon()}
        </TouchableOpacity>
    );
}
