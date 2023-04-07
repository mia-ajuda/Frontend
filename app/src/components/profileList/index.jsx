import React from 'react';
import { View, Pressable } from 'react-native';
import styles from './styles';
import { UserListItem } from '../molecules/UserListItem';
import { Divider } from '../atoms/Divider';
export default function ProfileList({ usersProfile, navigation }) {
    //This is an old code and will be removed in next PR with the new profile page
    const handlenavigate = (profile) =>
        navigation.navigate('socialUserProfile', {
            selectedProfileId: profile._id,
            selectedProfileUsername: profile.username,
            selectedProfileNumberOfFollowers: profile.numberOfFollowers,
            selectedProfileNumberOfFollowing: profile.numberOfFollowing,
            selectedProfilePhoto: profile.photo,
            selectedProfileIsFollowing: profile.isFollowing,
            selectedProfileUserId: profile.userId,
        });
    return (
        <View style={styles.userList}>
            {usersProfile &&
                usersProfile.map((profile, i) => (
                    <Pressable
                        key={profile._id}
                        onPress={() => handlenavigate(profile)}
                    >
                        <UserListItem user={profile} />
                        {i != usersProfile.length - 1 && <Divider />}
                    </Pressable>
                ))}
        </View>
    );
}
