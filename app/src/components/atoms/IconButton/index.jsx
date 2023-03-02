import React from 'react'
import { Icon } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'
import colors from '../../../../assets/styles/colorVariables'
import { styles } from './styles'

export const IconButton = ({ icon, onPress }) => {
    return (
        <TouchableOpacity
            style={styles.drawerButtonContainer}
            onPress={onPress}
        >
            <Icon name={icon} color={colors.light} />
        </TouchableOpacity>
    )
}
