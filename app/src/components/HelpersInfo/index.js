import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Text, View } from 'react-native';
import { colors, Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import api from '../../services/Api';
import callNumber from '../../utils/callNumber';
import getYearsSince from '../../utils/getYearsSince';
import openWhatsapp from '../../utils/openWhatsapp';
import styles from './styles';

export default function HelpersInfo({ userId, title }) {
    const [user, setUser] = useState();
    const [loadUserInfo, setLoadUserInfo] = useState(true);
    useEffect(() => {
        async function fetchUserData() {
            setLoadUserInfo(true);
            const userData = await api.get(`user/getUser/${userId}`);
            setUser(userData.data);
            setLoadUserInfo(false);
        }
        fetchUserData();
    }, []);
    return !loadUserInfo ? (
        <View style={styles.helpersContainer}>
            <View style={styles.contentContainer}>
                {title && <Text style={styles.containerTitle}>{title}</Text>}
                <Image
                    source={{ uri: `data:image/png;base64,${user.photo}` }}
                    style={styles.imageContainer}
                />
                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.userSubtitle}>
                    {getYearsSince(user.birthday)} anos - {user.address.city}
                </Text>
                <Text style={styles.phoneNumber}>Número: {user.phone}</Text>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity
                        color="#34A853"
                        style={styles.wppButton}
                        onPress={() => openWhatsapp(user.phone)}
                    >
                        <Icon
                            name="whatsapp"
                            type="font-awesome"
                            size={30}
                            color="#FAFAFA"
                        />
                        <Text style={styles.wppText}>Inicie uma conversa</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        color="#FAFAFA"
                        style={styles.callButton}
                        onPress={() => callNumber(user.phone)}
                    >
                        <Icon name="phone" size={30} />
                        <Text style={styles.callText}>Faça uma ligação</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    ) : (
        <View style={styles.loadingUserInfo}>
            <ActivityIndicator size="large" color={colors.primary} />
        </View>
    );
}
