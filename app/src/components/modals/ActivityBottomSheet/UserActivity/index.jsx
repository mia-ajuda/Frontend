import React, { useContext, useState } from 'react';
import { Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { ProfilePhoto } from '../../../molecules/ProfilePhoto';
import getYearsSince from '../../../../utils/getYearsSince';
import shortenName from '../../../../utils/shortenName';
import { CategoriesList } from '../../../molecules/CategoriesList';
import getActivityIcon from '../../../../utils/getActivityIcon';
import Button from '../../../UI/button';
import colors from '../../../../../colors';
import { alertSuccess } from '../../../../utils/Alert';
import { ActivitiesContext } from '../../../../store/contexts/activitiesContext';
import { BadgeContext } from '../../../../store/contexts/badgeContext';
import { LoadingContext } from '../../../../store/contexts/loadingContext';
import { UserContext } from '../../../../store/contexts/userContext';
import { Dialog } from '../../../molecules/Dialog';

export const UserActivity = ({
    activityType,
    activityInfo,
    ownerInfo,
    isRiskGroup,
    setShowModal,
    navigation,
}) => {
    const { interactWithActivity } = useContext(ActivitiesContext);
    const { increaseUserBadge } = useContext(BadgeContext);
    const { setIsLoading } = useContext(LoadingContext);
    const { user } = useContext(UserContext);
    const [confirmationModalVisible, setConfirmationModalVisible] =
        useState(false);

    const activityIcon = getActivityIcon(activityType);
    const indicatorColor = isRiskGroup
        ? { icon: colors.danger[300], text: 'text-danger-300' }
        : { icon: colors.primary[300], text: 'text-primary-300' };

    const messages = {
        offer: {
            success:
                'Sua candidatura foi enviada com sucesso e estará no aguardo para ser aceita',
            modal: 'Você deseja confirmar a sua candidatura?',
            button: 'Se candidatar',
        },
        help: {
            success:
                'Oferta enviada com sucesso e estará no aguardo para ser aceita',
            modal: 'Você deseja confirmar a sua ajuda?',
            button: 'Oferecer ajuda',
        },
    };

    const closeModal = () => {
        setShowModal(false);
        setConfirmationModalVisible(false);
    };

    const handleConfirmPress = async () => {
        const isRequest = activityType === 'help';
        const response = await interactWithActivity(
            activityInfo._id,
            !isRequest,
        );
        if (!response.error) {
            alertSuccess(messages[activityType].success);
            if (isRequest) {
                const badgeResponse = await increaseUserBadge(
                    user._id,
                    'offer',
                    navigation,
                );
                if (!badgeResponse.recentUpdated) closeModal();
            } else closeModal();
        }
        if (isRequest) setIsLoading(false);
    };

    return (
        <>
            <Dialog
                title={'Confirmar candidatura?'}
                description={messages[activityType].modal}
                cancelText={'Não'}
                confirmText={'Sim'}
                isVisible={confirmationModalVisible}
                onCloseDialog={() => setConfirmationModalVisible(false)}
                onConfirmPress={handleConfirmPress}
            />
            <View className="flex-row items-center mb-4">
                <Icon
                    name={activityIcon.name}
                    type={activityIcon.type}
                    size={32}
                    color={indicatorColor.icon}
                />
                <Text
                    className={`${indicatorColor.text} font-ms-semibold text-2xl ml-2`}
                >
                    Pedido
                </Text>
            </View>
            <View className="justify-center">
                <View className="flex-row mb-4">
                    <ProfilePhoto
                        size={'md'}
                        className="mr-2"
                        base64={ownerInfo?.photo}
                    />
                    <View>
                        <Text
                            numberOfLines={1}
                            className="text-lg font-ms-bold text-black"
                        >
                            {ownerInfo?.name}
                        </Text>
                        <Text
                            className="font-ms-regular text-sm"
                            numberOfLines={1}
                        >
                            {getYearsSince(ownerInfo?.birthday)} anos
                        </Text>
                        <Text
                            className="font-ms-regular text-sm"
                            numberOfLines={1}
                        >
                            {shortenName(ownerInfo?.address?.city)} -{' '}
                            {ownerInfo?.address?.state}
                        </Text>
                    </View>
                </View>
            </View>
            <View className="bg-white rounded-md p-4 pb-2">
                <Text className="text-lg font-ms-bold text-primary mb-1">
                    {' '}
                    {activityInfo?.title}{' '}
                </Text>
                <CategoriesList categories={activityInfo?.categories} />
                <Text className="text-base text-black h-28" numberOfLines={4}>
                    {activityInfo?.description}{' '}
                </Text>
                <Button
                    press={() => setConfirmationModalVisible(true)}
                    title={messages[activityType].button}
                    large
                />
            </View>
        </>
    );
};
