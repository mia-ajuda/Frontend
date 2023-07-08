import React from 'react';
import colors from '../../../../colors';
import { Icon } from 'react-native-elements';
import { Text, View } from 'react-native';
import shortenName from '../../../utils/shortenName';
import { DefaultButton } from '../../atoms/DefaultButton';
import { CategoriesList } from '../../molecules/CategoriesList';
import openWhatsapp from '../../../utils/openWhatsapp';
import { openMaps } from '../../../utils/openMaps';

export const EntityActivity = ({ activityInfo, ownerInfo }) => {
    const phoneIcon = {
        name: 'phone',
        type: 'font-awesome-5',
    };

    const locationIcon = {
        name: 'directions',
        type: 'font-awesome-5',
    };

    const handleCall = () => {
        const message = `Olá ${ownerInfo.name}, vi sua campanha no app Mia Ajuda e tenho interesse em participar!`;
        openWhatsapp(ownerInfo.phone, message);
    };

    const handleOpenMaps = () => {
        const campaignLatitude =
            activityInfo.location?.coordinates[1] ??
            ownerInfo.location.coordinates[1];
        const campaignLongitude =
            activityInfo.location?.coordinates[0] ??
            ownerInfo.location.coordinates[0];
        const campaignLabel = 'Campanha de ' + ownerInfo.name;
        openMaps(campaignLatitude, campaignLongitude, campaignLabel);
    };

    return (
        <>
            <View className="flex-row items-start mb-2">
                <View className="flex-row items-center flex-1">
                    <Icon name={'home'} size={32} color={colors.primary[300]} />
                    <Text
                        className={
                            'text-primary-300 font-ms-semibold text-2xl ml-1'
                        }
                    >
                        Campanha
                    </Text>
                </View>
                <View className="justify-center ml-auto flex-1">
                    <Text
                        numberOfLines={1}
                        className="text-lg font-ms-bold text-black"
                    >
                        {ownerInfo?.name}
                    </Text>
                    <Text className="font-ms-regular text-sm" numberOfLines={1}>
                        {shortenName(ownerInfo?.address?.city)} -{' '}
                        {ownerInfo?.address?.state}
                    </Text>
                </View>
            </View>
            <View className="flex-1 flex-row mb-4 w-full justify-between flex-wrap">
                <DefaultButton
                    width="w-[46%]"
                    variant="secondary"
                    onPress={handleCall}
                    title={'Ligar'}
                    icon={phoneIcon}
                    size="md"
                />
                <DefaultButton
                    width="w-[46%]"
                    variant="secondary"
                    onPress={handleOpenMaps}
                    title={'Rotas'}
                    icon={locationIcon}
                    size="md"
                />
            </View>
            <View className="bg-white rounded-md p-4">
                <Text className="text-lg font-ms-bold text-primary">
                    {activityInfo?.title}{' '}
                </Text>
                <CategoriesList categories={activityInfo?.categories} />
                <Text className="text-base text-black h-24" numberOfLines={4}>
                    {activityInfo?.description}
                </Text>
            </View>
        </>
    );
};
