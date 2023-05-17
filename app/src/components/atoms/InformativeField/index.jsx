import React from 'react';
import { Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import tailwindConfig from '../../../../tailwind.config';

export const InformativeField = ({
    type = 'informative',
    title = 'Aguardando contato',
    variant = '',
    text = '',
}) => {
    const variants = {
        informative: {
            title,
            text,
            icon: 'info',
            color: 'bg-new_background',
        },
        error: {
            title: 'Aconteceu algo errado',
            text: 'Não foi possível solicitar sua informação! Erro interno do aplicativo',
            icon: 'cancel',
            color: 'bg-danger-200',
        },
        warning: {
            title: 'Aviso importante',
            text,
            icon: 'error',
            color: 'bg-secondary-500',
        },
        help: {
            text: 'O dono do pedido aceitou sua oferta e logo entrará em contato',
        },
        offer: {
            text: 'O dono da oferta aceitou seu pedido e logo entrará em contato',
        },
    };

    return (
        <View
            className={`w-full ${variants[type].color} border mt-6 border-gray-contrast rounded-lg`}
        >
            <View className="py-5 px-2 flex-row space-x-2">
                <Icon
                    name={variants[type].icon}
                    size={20}
                    color={tailwindConfig.theme.extend.colors.black}
                />
                <View className="pr-3">
                    <Text className="font-ms-bold text-black">
                        {variants[type].title}
                    </Text>
                    <Text className="font-ms-regular mt-1 text-black">
                        {variants[variant || type].text}
                    </Text>
                </View>
            </View>
        </View>
    );
};
