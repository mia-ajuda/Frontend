import React from 'react';
import { CustomHeader } from '../../../components/molecules/CustomHeader';
import { getScreenTtile } from '../../../utils/getScreenTitle';

const headerStyle = ({navigation, route, iconType='drawer'}) => {
    return {
        header: () => <CustomHeader navigation={navigation} title={getScreenTtile(route.name)} iconType={iconType} />
    }
};

export default headerStyle;
