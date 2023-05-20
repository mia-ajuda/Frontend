import React from 'react'
import { Text, View } from 'react-native'
import { Icon } from 'react-native-elements'
import { ProfilePhoto } from '../../molecules/ProfilePhoto'
import getYearsSince from '../../../utils/getYearsSince'
import shortenName from '../../../utils/shortenName'
import { CategoriesList } from '../../molecules/CategoriesList'
import getActivityIcon from '../../../utils/getActivityIcon'
import Button from '../../UI/button'
import colors from '../../../../colors'

export const UserActivity = ({ activityType, activityInfo, ownerInfo, isRiskGroup }) => {
    const activityIcon = getActivityIcon(activityType)
    const indicatorColor = isRiskGroup ? { icon: colors.danger[300], text: 'text-danger-300' } :
        { icon: colors.primary[300], text: 'text-primary-300' }

    return (
        <>
            <View className='flex-row items-center mb-4'>
                <Icon name={activityIcon.name} type={activityIcon.type} size={22} color={indicatorColor.icon} />
                <Text className={`${indicatorColor.text} font-ms-semibold text-lg ml-2`}>Pedido</Text>
            </View>
            <View className='justify-center'>
                <View className='flex-row mb-4'>
                    <ProfilePhoto size={'md'} className="mr-2" />
                    <View>
                        <Text numberOfLines={1} className='text-lg font-ms-bold text-black'>
                            {ownerInfo?.name}
                        </Text>
                        <Text className='font-ms-regular text-sm' numberOfLines={1}>
                            {getYearsSince(ownerInfo?.birthday)} anos
                        </Text>
                        <Text className='font-ms-regular text-sm' numberOfLines={1}>
                            {shortenName(ownerInfo?.address?.city)} - {ownerInfo?.address?.state}
                        </Text>
                    </View>
                </View>
            </View>
            <View className='bg-white rounded-md p-4 pb-2'>
                <Text className='text-lg font-ms-bold text-primary'> {activityInfo?.title} </Text>
                <View className='flex-row'>
                    <CategoriesList categories={activityInfo?.categories} />
                </View>
                <Text className='text-base text-black h-28' numberOfLines={4}>{activityInfo?.description} </Text>
                <Button press={console.log} title={'Oferecer Ajuda'} large />
            </View>
        </>
    )
}
