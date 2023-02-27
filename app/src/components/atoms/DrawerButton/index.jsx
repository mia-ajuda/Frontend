import React from 'react'
import { Icon } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'
import colors from '../../../../assets/styles/colorVariables'
import { styles } from './styles'

export const DrawerButton = ({ navigation }) => {
    return (
        <TouchableOpacity
            style={styles.drawerButtonContainer}
            onPress={() => navigation.openDrawer()}
        >
            <Icon name="menu" color={colors.light} />
        </TouchableOpacity>
    )
}
