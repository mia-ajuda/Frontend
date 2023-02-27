import React from 'react';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import colors from '../../assets/styles/colorVariables';

export const showDrawerButton = ({ navigation }) => ({
    headerLeft: () => (
        <TouchableOpacity
            style={{ padding: 12 }}
            onPress={() => navigation.openDrawer()}
        >
            <Icon name="menu" color={colors.light} />
        </TouchableOpacity>
    ),
});
