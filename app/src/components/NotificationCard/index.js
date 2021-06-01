import React, { useState, useEffect, useContext } from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import getPastimeFrom from '../../utils/getPastTime';
import colors from '../../../assets/styles/colorVariables';
import styles from './styles';
import helpService from '../../services/Help';
import useService from '../../services/useService';
import { UserContext } from '../../store/contexts/userContext';

export default function NotificationCard({
    notification,
    dateNow,
    navigation,
}) {
    const [notificationTime, setNotificationTime] = useState('');
    const { user } = useContext(UserContext);
    useEffect(() => {
        const notificationPastTime = getPastimeFrom(notification.registerDate);
        setNotificationTime(notificationPastTime);
    }, [dateNow]);

    async function navigateToHelpPage() {
        const help = await useService(
            helpService,
            'getHelpWithAggregationById',
            [notification.helpId],
        );

        const thisUserIsHelper = user._id != help.ownerId ? true : false;
        if (thisUserIsHelper) {
            navigation.navigate('MyRequestHelpDescrition', {
                help,
            });
        } else {
            navigation.navigate('myOfferHelpDescription', {
                help,
            });
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
        <TouchableOpacity
            style={styles.cardContainer}
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
