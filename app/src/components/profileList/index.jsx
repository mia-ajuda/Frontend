import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import { UserListItem } from '../molecules/UserListItem';
export default function ProfileList({ usersProfile, navigation }) {
    return (
        <View style={styles.userList}>
            {usersProfile &&
                usersProfile.map((profile) => (
                    <TouchableOpacity
                        key={profile._id}
                        onPress={() =>
                            navigation.navigate('socialUserProfile', {
                                selectedProfileId: profile._id,
                                selectedProfileUsername: profile.username,
                                selectedProfileNumberOfFollowers:
                                    profile.numberOfFollowers,
                                selectedProfileNumberOfFollowing:
                                    profile.numberOfFollowing,
                                selectedProfilePhoto: profile.photo,
                                selectedProfileIsFollowing: profile.isFollowing,
                                selectedProfileUserId: profile.userId,
                            })
                        }
                    >
                        <UserListItem user={profile} />
                    </TouchableOpacity>
                ))}
        </View>
    );
}
