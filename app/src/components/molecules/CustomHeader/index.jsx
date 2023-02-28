import React from 'react'
import { Text, View } from 'react-native'
import { DrawerButton } from '../../atoms/DrawerButton'
import { styles } from './styles'
export const CustomHeader = ({ title, navigation }) => {
    return (
        <View style={styles.header}>
            <View style={styles.content}>
                <DrawerButton navigation={navigation} />
                <Text style={styles.title}>{title}</Text>
            </View>
        </View>
    )
}
