import React from 'react';
import { Text, View } from 'react-native';
import { IconButton } from '../../atoms/IconButton';
import { styles } from './styles';
import { RFValue } from 'react-native-responsive-fontsize';
import colors from '../../../../assets/styles/colorVariables';

export const CustomHeader = ({ title, navigation, iconType }) => {
    const isDrawerButton = iconType == 'drawer';
    const onPress = isDrawerButton
        ? () => navigation.openDrawer()
        : () => navigation.goBack();

    const customMenuStyle = {
        backgroundColor: colors.primary,
        padding: RFValue(4, 640),
        marginRight: RFValue(8, 640),
        marginLeft: RFValue(8, 640),
        borderRadius: 100,
    };

    const icon = isDrawerButton
        ? {
              icon: 'menu',
              theme: 'light',
              customStyle: customMenuStyle,
          }
        : {
              icon: 'arrow-back',
              theme: 'dark',
          };

    return (
        <View style={styles.header}>
            <View style={styles.content}>
                <IconButton onPress={onPress} style={styles.icon} {...icon} />
                <Text style={styles.title}>{title}</Text>
            </View>
        </View>
    );
};
