import React from 'react';
import Badge from '../Badge';
import { View } from 'native-base';

export const CategoriesList = ({ categories, size = 'medium', spacing = '' }) => {
    return (
        <View className={`flex flex-row w-full justify-center flex-wrap ${spacing}`}>
            {categories?.map((category, i) => (
                <Badge title={category.name} key={i} size={size} />
            ))}
        </View>
    );
};
