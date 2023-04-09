import React from 'react';
import { View, Pressable } from 'react-native';
import styles from './styles';
import { UserListItem } from '../molecules/UserListItem';
import { Divider } from '../atoms/Divider';
export default function ProfileList({ usersProfile, navigation }) {
    const filteredUsers = usersProfile?.filter((user) => user.cpf);
    const handlenavigate = (profile) =>
        navigation.navigate('socialUserProfile', {
            userId: profile.userId,
        });
    return (
        <View style={styles.userList}>
            {filteredUsers &&
                filteredUsers.map((profile, i) => (
                    <Pressable
                        key={profile._id}
                        onPress={() => handlenavigate(profile)}
                    >
                        <UserListItem user={profile} />
                        {i != filteredUsers.length - 1 && <Divider />}
                    </Pressable>
                ))}
        </View>
    );
}
