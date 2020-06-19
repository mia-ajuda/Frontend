import React from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import colors from '../../../assets/styles/colorVariables';
import styles from './styles';

export default function Avatar({ help }) {
  const isRiskGroup = !!help.user.riskGroup.length;
  const iconColor = isRiskGroup ? colors.danger : colors.primary;

  return (
    <View style={styles.container}>
      <Icon name="exclamation" type="font-awesome" size={45} color={iconColor} />
    </View>
  );
}
