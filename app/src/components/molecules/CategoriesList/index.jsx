import React from 'react';
import Badge from '../Badge';

export const CategoriesList = ({ categories, size = 'medium' }) => {
    return categories.map((category) => (
        <Badge title={category.name} key={category._id} size={size} />
    ));
};
