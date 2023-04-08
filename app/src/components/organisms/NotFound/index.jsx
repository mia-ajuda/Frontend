import React from 'react';
import NotFoundImage from '../../../../assets/images/notFoundImage';
import { Text, View } from 'react-native';

export const NotFound = ({
    title = 'Sem resultados',
    body,
    size = 'regular',
}) => {
    const sizeOptions = {
        image: {
            width: {
                small: '100',
                regular: '180',
                large: '300',
            },
            height: {
                small: '100',
                regular: '180',
                large: '300',
            },
        },
        title: {
            small: 'text-base',
            regular: 'text-lg ',
            large: 'text-xl',
        },
        body: {
            small: 'text-sm',
            regular: 'text-base ',
            large: 'text-lg',
        },
    };

    return (
        <View className="flex-1 items-center">
            <NotFoundImage
                width={sizeOptions.image.width[size]}
                height={sizeOptions.image.height[size]}
            />
            <Text
                className={`${sizeOptions.title[size]} font-semibold text-center`}
            >
                {title}
            </Text>
            <Text className={`${sizeOptions.body[size]} text- text-center`}>
                {body}
            </Text>
        </View>
    );
};
