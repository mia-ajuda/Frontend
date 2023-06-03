import React from 'react';
import Badge from '../Badge';
import { View } from 'native-base';

export const CategoriesList = ({
    categories,
    size = 'medium',
    customStyle = '',
}) => {
    const align = categories?.length >= 3 ? 'justify-center' : '';
    return (
        <View className={`flex flex-row flex-wrap ${align} ${customStyle}`}>
            {categories?.map((category) => (
                <Badge title={category.name} key={category._id} size={size} />
            ))}
        </View>
    );
};
