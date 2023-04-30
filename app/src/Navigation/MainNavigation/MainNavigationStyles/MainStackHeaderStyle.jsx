import React from 'react';
import { CustomHeader } from '../../../components/molecules/CustomHeader';
import { getScreenTtile } from '../../../utils/getScreenTitle';

const headerStyle = ({
    navigation,
    route,
    iconType = 'drawer',
    shouldRenderAuxiliarButton,
}) => {
    return {
        header: () => (
            <CustomHeader
                navigation={navigation}
                title={getScreenTtile(route.name)}
                iconType={iconType}
                shouldRenderAuxiliarButton={shouldRenderAuxiliarButton}
                route={route}
            />
        ),
    };
};

export default headerStyle;
