import React from 'react';
import { BaseModal } from '../BaseModal';
import { CircleBadge } from '../../atoms/CircleBadge';
import { Text, View } from 'react-native';
import Button from '../../UI/button';

export const BadgeEarnModal = ({
    badge,
    navigation,
    setIsVisible,
    ...modalProps
}) => {
    const badgeMessages = {
        offer: {
            1: 'você está fazendo a diferença, e por conta disso conquistou a conquista',
            2: 'você continua tentando ajudar ao máximo, e por conta disso agora recebeu a conquista',
            3: 'você continua tentando ajudar ao máximo, e por conta disso agora recebeu a conquista',
        },
        tester: {
            1: 'você é uma das pessoas que está levando o projeto para frente, e por conta disso conquistou a conquista',
            2: 'você realmente é um guerreiro, e por conta disso conquistou a conquista',
            3: 'você realmente é um guerreiro, e por conta disso conquistou a conquista',
        },
    };

    const handleContinue = () => {
        setIsVisible(false);
        if (navigation)
            navigation.reset({
                index: 0,
                routes: [{ name: 'home' }],
            });
    };

    const message = badgeMessages[badge.category][badge.rank];
    const title = badge.rank == 1 ? 'Nova Conquista' : 'Novo Nível';

    return (
        badge && (
            <BaseModal onCloseModal={handleContinue} {...modalProps}>
                <View className="items-center">
                    <CircleBadge
                        badgeIcon={badge?.iconName}
                        rank={badge?.rank}
                        size="md"
                    />
                    <Text className="text-lg font-ms-bold text-black my-2">
                        {title}
                    </Text>
                    <Text className="text-base font-ms-regular text-black text-center leading-4 mb-2">
                        {`Parabéns, ${message} `}{' '}
                        <Text className="font-ms-bold">"{badge?.name}"</Text>
                    </Text>
                    <Button title="Continuar" large press={handleContinue} />
                </View>
            </BaseModal>
        )
    );
};
