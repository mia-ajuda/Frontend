import React from 'react';
import Badge from '../Badge';
import { View } from 'native-base';

export const CategoriesList = ({ categories, size = 'medium' }) => {
    console.log(categories)
    return (
        <View className='flex-row'>
            {categories?.map((category) => (<Badge title={category.name} key={category._id} size={size} />))}
        </View>
    );
};
