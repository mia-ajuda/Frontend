import React from 'react';
import { View } from 'react-native';
import styles from './styles';

export default function Container(props) {
    return <View style={styles.container}>{props.children}</View>;
}
