import React from 'react';
import { TouchableOpacity, View, Image, Text } from 'react-native';
import styles from './styles';
import { untilTwoLastNames } from '../../utils/shortenName';

const UserCard = (props) => {
    const { user, handleClick } = props;

    return (
        <TouchableOpacity onPress={() => handleClick(user._id)}>
            <View style={styles.interested}>
                <Image
                    style={styles.imageProfile}
                    source={{
                        uri: `data:image/png;base64,${user.photo}`,
                    }}
                />
                <Text style={[styles.infoText, styles.infoTextFont]}>
                    {untilTwoLastNames(user.name)}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

export default UserCard;
