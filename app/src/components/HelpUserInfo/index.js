import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from './styles';
import calculateAge from '../../utils/calculateAge';

export default function HelpUserInfo({ help, photo = null }) {
    return (
        <View style={styles.userInfo}>
            <Image source={photo} style={styles.ownerPhoto} />
            <Text style={styles.name}>{help.user.name}</Text>
            <Text style={styles.text}>
                {calculateAge(help.user.birthday)} anos
            </Text>
        </View>
    );
}
