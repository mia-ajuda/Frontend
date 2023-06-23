import React from 'react'
import { Text, View } from 'react-native'
import { DefaultTimeline } from '../../components/organisms/DefaultTimeline'
import { mockedData } from './mockedData'

export const Timeline = () => {
  return (
    <View className='bg-new_background flex-1 px-4 py-6'>
      <DefaultTimeline data={mockedData} useIcon/>
    </View>
  )
}
