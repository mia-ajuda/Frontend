import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import colors from '../../../../colors';

export const TutorialCard = ({
    title,
    description,
    onPress,
    margin = '',
    leftAligment = true,
}) => {
    const flexRow = leftAligment ? 'flex-row' : 'flex-row-reverse';
    return (
        <Pressable
            android_ripple={{
                color: colors.gray.contrast,
            }}
            onPress={onPress}
            className={`w-full ${flexRow} bg-white rounded-lg shadow-md border-[0.5px] border-black-100 p-4 items-center justify-between ${margin} h-40`}
        >
            <Image
                source={require('../../../../assets/images/blueCat.png')}
                className="h-20 w-1/5"
                style={{ resizeMode: 'contain' }}
            />
            <View className="w-3/4">
                <Text className="font-ms-semibold text-base text-black">
                    {title}
                </Text>
                <Text className="font-ms-regular text-black">
                    {description}
                </Text>
            </View>
        </Pressable>
    );
};
