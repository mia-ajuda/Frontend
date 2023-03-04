import React from 'react'
import { Image, Text, View } from 'react-native'
import { Icon } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'
import callService from '../../../services/callService'
import { styles } from './styles'
import SessionService from '../../../services/Session';
import shortenName from '../../../utils/shortenName'

export const UserCard = ({ name, email, photo }) => {
    const handleLogout = async () => {
        await callService(SessionService, 'signOut');
    }

    return (
        <View style={styles.userCardContainer}>
            <View style={styles.userInfo}>
                <Image
                    source={{ uri: `data:image/png;base64,${photo}` }}
                    style={styles.userPhoto}
                />
                <View>
                    <Text style={styles.userName} numberOfLines={1}>{shortenName(name)}</Text>
                    <Text style={styles.userEmail} numberOfLines={1}>{email}</Text>
                </View>
            </View>
            <TouchableOpacity onPress={handleLogout}>
                <Icon name="logout" />
            </TouchableOpacity>
        </View>
    )
}
