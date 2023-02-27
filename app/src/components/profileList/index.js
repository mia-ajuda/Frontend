import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
export default function ProfileList({ usersProfile, navigation }) {
    return (
        <View>
            {usersProfile &&
                usersProfile.map((profile) => (
                    <TouchableOpacity
                        key={profile._id}
                        onPress={() =>
                            navigation.navigate('Perfil social dos Usuários', {
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
                        <View style={[styles.card, styles.elevation]}>
                            <Image
                                style={styles.profileImage}
                                source={{
                                    uri: `data:image/png;base64,${profile.photo}`,
                                }}
                            />
                            <View style={styles.textContainer}>
                                <Text style={styles.text}>
                                    {profile.username}
                                </Text>
                                <Text style={styles.text}>
                                    Seguidores: {profile.numberOfFollowers}
                                </Text>
                                <Text style={styles.text}>
                                    Seguindo: {profile.numberOfFollowing}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
        </View>
    );
}