import React from 'react';
import { CustomHeader } from '../components/molecules/CustomHeader';

export const showCustomHeader = (title, navigation) => ({
    header: () => <CustomHeader navigation={navigation} title={title} />,
});
