import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

export const HorizontalList = ({
    children,
    className = '',
    showMoreButton = false,
    onPressMoreButton,
}) => {
    const margin = showMoreButton ? 'mt-8' : '';
    return (
        <View className={'w-full h-60'}>
            {showMoreButton && (
                <Pressable
                    onPress={onPressMoreButton}
                    android_ripple={{ color: '#c4c4c4' }}
                    className="absolute z-10 right-0 top-2"
                >
                    <Text className="text-primary text-xs font-ms-bold">
                        VER TUDO
                    </Text>
                </Pressable>
            )}
            <ScrollView
                horizontal
                className={`${margin} ${className}`}
                contentContainerStyle={{ alignItems: 'center' }}
            >
                {children}
            </ScrollView>
        </View>
    );
};
