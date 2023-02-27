import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator } from 'react-native';

import NotificationCard from '../../components/NotificationCard';
import { UserContext } from '../../store/contexts/userContext';
import NotificationService from '../../services/Notification';
import colors from '../../../assets/styles/colorVariables';
import styles from './styles';
import callService from '../../services/callService';

export default function Notification({ navigation }) {
    const [loadingNotifications, setLoading] = useState(false);
    const [helpNotifications, setNotifications] = useState([]);
    const { user } = useContext(UserContext);
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            loadNotifications();
        });
        return unsubscribe;
    }, [navigation]);

    async function loadNotifications() {
        const { _id: userId } = user;
        setLoading(true);
        const notificationsResponse = await callService(
            NotificationService,
            'getAllNotifications',
            [userId],
        );
        if (!notificationsResponse.error) {
            setNotifications(notificationsResponse);
        }
        setLoading(false);
    }

    const renderLoadingIndicator = () => (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
        </View>
    );
    const renderNotificationList = () => {
        if (helpNotifications.length == 0) {
            return (
                <View style={styles.noNotifications}>
                    <Image
                        source={require('../../../assets/images/blueCat.png')}
                        style={styles.emptyListImage}
                    />
                    <Text style={styles.emptyListText}>
                        Você não possui notificações
                    </Text>
                </View>
            );
        } else {
            return (
                <ScrollView>
                    <View style={styles.notificationList}>
                        {helpNotifications.map((notification) => (
                            <NotificationCard
                                key={notification._id}
                                notification={notification}
                                dateNow={Date.now()}
                                navigation={navigation}
                            />
                        ))}
                    </View>
                </ScrollView>
            );
        }
    };

    return (
        <View style={styles.container}>
            {loadingNotifications
                ? renderLoadingIndicator()
                : renderNotificationList()}
        </View>
    );
}
