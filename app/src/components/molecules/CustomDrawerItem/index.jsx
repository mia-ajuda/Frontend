import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';
export const CustomDrawerItem = ({ isSelected, icon, label, onPress }) => {
    return (
        <TouchableOpacity
            style={
                isSelected
                    ? styles.selectedDrawerItemContainer
                    : styles.drawerItemContainer
            }
            onPress={onPress}
        >
            {icon()}
            <Text style={styles.label}>{label}</Text>
        </TouchableOpacity>
    );
};
