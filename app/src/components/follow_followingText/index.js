import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from './styles';
export default function FollowFollowingText( {
    text, number, selectedProfileId, navigation }) {
   

    return (
        <TouchableOpacity
            key={text}
            onPress={() =>
                navigation.navigate('FollowersFollowingPage', {
                    selectedProfileId: selectedProfileId,
                    isFollowersPage: text == 'Seguidores',
                })
            }
        >
            <Text style={styles.text}>
                {' '}
                {number} {text}
            </Text>
        </TouchableOpacity>
    );

}