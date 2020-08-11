import React, { useState, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import getPastimeFrom from '../../utils/getPastTime';
import colors from '../../../assets/styles/colorVariables';
import styles from './styles';
import helpService from '../../services/Help';
import userService from '../../services/User';

export default function NotificationCard({
    notification,
    dateNow
}) {
    const [notificationTime, setNotificationTime] = useState('');
    const navigation = useNavigation();
    useEffect(() => {
        const notificationPastTime = getPastimeFrom(notification.registerDate);
        setNotificationTime(notificationPastTime);
    }, [dateNow]);

    async function navigateToHelpPage(){
        const help = await helpService.getHelpWithAggregationById(notification.helpId);
        switch (notification.notificationType) {
            case 'ajudaRecebida':
                navigation.navigate(
                    'MyRequestHelpDescrition',
                    {
                        help,
                    },
                );
                break;

            case 'ajudaAceita':
                navigation.navigate(
                    'OfferDescription',
                    {
                        help,
                    },
                );
                break;

            case 'ajudaFinalizada':
                navigation.navigate(
                    'OfferDescription',
                    {
                        help,
                    },
                );
                break;

            case 'ajudaExpirada':
                break;
        }
    }

    const renderCardIcon = () => {
        let iconName;
        let iconBackground;

        switch (notification.notificationType) {
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
            key={notification.helpId}
            onPress={navigateToHelpPage}>
            <View style={styles.info}>
                <Text style={styles.title} numberOfLines={2}>
                    {notification.title}
                </Text>
                <Text numberOfLines={2}>{notification.body}</Text>
                <Text style={styles.time}>{notificationTime}</Text>
            </View>
            {renderCardIcon()}
        </TouchableOpacity>
    );
}
