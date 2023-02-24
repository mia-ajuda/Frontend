import React from 'react'
import { Image, Text, View } from 'react-native'
import { Icon } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { styles } from './styles'

export const UserCard = ({ name, email, photo }) => {
    return (
        <View style={styles.userCardContainer}>
            <View style={styles.userInfo}>
                <Image
                    source={{ uri: `data:image/png;base64,${photo}` }}
                    style={styles.userPhoto}
                />
                <View>
                    <Text style={styles.userName}>{name}</Text>
                    <Text style={styles.userEmail}>{email}</Text>
                </View>
            </View>
            <TouchableOpacity>
                <Icon name="logout" />
            </TouchableOpacity>
        </View>
    )
}
