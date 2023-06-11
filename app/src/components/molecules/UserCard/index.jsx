import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { styles } from './styles';
import shortenName from '../../../utils/shortenName';
import { ProfilePhoto } from '../ProfilePhoto';
import { UserContext } from '../../../store/contexts/userContext';

export const UserCard = ({ name, email, photo }) => {
    const { logout } = useContext(UserContext);
    const handleLogout = async () => {
        await logout();
    };

    return (
        <View style={styles.userCardContainer}>
            <View style={styles.userInfo}>
                <ProfilePhoto size={'xs'} base64={photo} className="mr-2" />
                <View>
                    <Text style={styles.userName} numberOfLines={1}>
                        {shortenName(name)}
                    </Text>
                    <Text style={styles.userEmail} numberOfLines={1}>
                        {email}
                    </Text>
                </View>
            </View>
            <TouchableOpacity onPress={handleLogout}>
                <Icon name="logout" />
            </TouchableOpacity>
        </View>
    );
};
