import React from 'react'
import { Text, View } from 'react-native'
import { showDrawerButton } from '../../../utils/showDrawerButton'
import { DrawerButton } from '../../atoms/DrawerButton'
import { styles } from './styles'
export const CustomHeader = ({title, navigation}) => {
    return (
        <View style={styles.header}>
            <DrawerButton navigation={navigation}/>
            <Text style={styles.title}>sdkidjdsa</Text>
        </View>
    )
}
