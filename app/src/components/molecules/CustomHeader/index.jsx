import React from 'react'
import { Text, View } from 'react-native'
import { IconButton } from '../../atoms/IconButton'
import { styles } from './styles'
export const CustomHeader = ({ title, navigation, iconType}) => {
    const isDrawerButton = iconType == 'drawer';
    const onPress = isDrawerButton ? () => navigation.openDrawer() : () => navigation.goBack()
    const icon = isDrawerButton ? 'menu' : 'arrow-back'
    return (
        <View style={styles.header}>
            <View style={styles.content}>
                <IconButton onPress={onPress} icon={icon} />
                <Text style={styles.title}>{title}</Text>
            </View>
        </View>
    )
}
