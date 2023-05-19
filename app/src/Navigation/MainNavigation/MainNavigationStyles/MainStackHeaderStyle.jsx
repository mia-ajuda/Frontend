import React from 'react';
import { CustomHeader } from '../../../components/molecules/CustomHeader';
import { getScreenTtile } from '../../../utils/getScreenTitle';

const headerStyle = ({
    navigation,
    route,
    iconType = 'drawer',
    buttonProps,
}) => {
    return {
        header: () => (
            <CustomHeader
                navigation={navigation}
                title={getScreenTtile(route.name)}
                iconType={iconType}
                buttonProps={buttonProps}
            />
        ),
    };
};

export default headerStyle;
