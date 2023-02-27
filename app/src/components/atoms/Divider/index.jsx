import React from 'react'
import { View } from 'react-native'
import { styles } from './styles'

export const Divider = ({marginHorizontal = 0}) => {
  return (
    <View style={[styles.divider, {marginHorizontal: marginHorizontal}]}></View>
  )
}
