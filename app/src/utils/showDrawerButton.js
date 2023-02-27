import React from 'react';
import { DrawerButton } from '../components/atoms/DrawerButton';

export const showDrawerButton = ({ navigation }) => ({
    headerLeft: () => <DrawerButton navigation={navigation} />,
});
