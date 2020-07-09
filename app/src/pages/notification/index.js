import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator } from 'react-native';

import NotificationCard from '../../components/NotificationCard';
import { UserContext } from '../../store/contexts/userContext';
import NotificationService from '../../services/Notification';
import colors from '../../../assets/styles/colorVariables';
import styles from './styles';

export default function Notification({ navigation }) {
    const [loadingNotifications, setLoading] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const { user } = useContext(UserContext);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            loadNotifications();
        });
        return unsubscribe;
    }, [navigation]);

    async function loadNotifications() {
        const { _id: userId } = user;
        try {
            setLoading(true);
            setNotifications(
                await NotificationService.getAllNotifications(userId),
            );
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    const renderLoadingIndicator = () => (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
        </View>
    );
    const renderNotificationList = () => {
        if (notifications.length == 0) {
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
                        {notifications.map((item) => (
                            <NotificationCard
                                key={item._id}
                                notificationType={item.notificationType}
                                notificationTitle={item.title}
                                notificationBody={item.body}
                                notificationDate={item.registerDate}
                                dateNow={Date.now()}
                            />
                        ))}
                    </View>
                </ScrollView>
            );
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}> Notificações </Text>
            </View>

            {loadingNotifications
                ? renderLoadingIndicator()
                : renderNotificationList()}
        </View>
    );
}
