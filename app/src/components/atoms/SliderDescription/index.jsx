import React from 'react'
import { Text } from 'react-native'

export const SliderDescription = ({description}) => {
  return (
    <Text className='font-ms-regular text-base px-4 text-black text-center'>
        {description}
    </Text>
  )
}
