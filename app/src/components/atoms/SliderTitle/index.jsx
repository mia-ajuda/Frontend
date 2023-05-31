import React from 'react'
import { Text } from 'react-native'

export const SliderTitle = ({title}) => {
  return (
    <Text className='font-ms-semibold text-xl px-4 text-primary text-center mb-4'>
        {title}
    </Text>
  )
}
