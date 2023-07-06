import React from 'react';
import { CustomHeader } from '../../../components/molecules/CustomHeader';
import { getScreenTtile } from '../../../utils/getScreenTitle';

const headerStyle = ({
    navigation,
    route,
    iconType = 'drawer',
    buttonProps,
    hasTitle = true,
}) => {
    return {
        header: () => (
            <CustomHeader
                navigation={navigation}
                title={getScreenTtile(route.name, hasTitle)}
                iconType={iconType}
                buttonProps={buttonProps}
            />
        ),
    };
};

export default headerStyle;
