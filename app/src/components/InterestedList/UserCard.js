import React from 'react';
import { TouchableOpacity, View, Image, Text } from 'react-native';
import styles from './styles';
import shortenName from '../../utils/shortenName';
import getYearsSince from '../../utils/getYearsSince';

const UserCard = (props) => {
    const { user, handleClick } = props;

    const userAge = getYearsSince(user.birthday);

    return (
        <TouchableOpacity onPress={() => handleClick(user._id)}>
            <View style={styles.interested}>
                <Image
                    style={styles.imageProfile}
                    source={{
                        uri: `data:image/png;base64,${user.photo}`,
                    }}
                />
                <View>
                    <Text style={[styles.infoText, styles.infoTextFont]}>
                        {shortenName(user.name)}
                    </Text>
                    {userAge != 0 && (
                        <Text>
                            <Text
                                style={[styles.infoText, styles.infoTextFont]}>
                                Idade:{' '}
                            </Text>
                            {userAge}
                        </Text>
                    )}
                    <Text>
                        <Text style={[styles.infoText, styles.infoTextFont]}>
                            Cidade:{' '}
                        </Text>
                        {user.address.city}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default UserCard;
