import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import Button from '../../../components/UI/button';
import useService from '../../../services/useService';
import socialNetworkProfileservice from '../../../services/socialNetworkProfile';

const socialNetworkProfilePage = ({ route }) => {
    const [isFollowing, setIsFollowing] = useState(null);
    const [followButtonName, setFollowButtonName] = useState(null);

    const {
        profileId,
        profileUsername,
        profileNumberOfFollowers,
        profileNumberOfFollowing,
        profilePhoto,
        profileIsFollowing,
        userId,
    } = route.params;

    useEffect(() => {
        let button_name = profileIsFollowing ? 'Seguindo' : 'Seguir';
        setIsFollowing(profileIsFollowing);
        setFollowButtonName(button_name);
    }, []);

    const followButton = () => {
        return (
            <Button
                title={followButtonName}
                type="default"
                press={async () => {
                    let tempIsFollowing;
                    if (isFollowing) {
                        tempIsFollowing = await useService(
                            socialNetworkProfileservice,
                            'unfollowUser',
                            [userId, profileId],
                        );
                    } else {
                        tempIsFollowing = await useService(
                            socialNetworkProfileservice,
                            'followUser',
                            [userId, profileId],
                        );
                    }
                    let button_name = tempIsFollowing ? 'Seguindo' : 'Seguir';
                    setIsFollowing(tempIsFollowing);
                    setFollowButtonName(button_name);
                }}
            />
        );
    };

    const followFollowing = (text, number, profileId) => {
        return (
            <TouchableOpacity
                onPress={() => console.log(text + ' ' + profileId)}>
                <Text style={styles.text}>
                    {number} {text}
                </Text>
            </TouchableOpacity>
        );
    };

    const profileImage = function () {
        return (
            <Image
                style={styles.profileImage}
                source={{
                    uri: `data:image/png;base64,${profilePhoto}`,
                }}
            />
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.profileInfoContainer}>
                {profileImage()}
                <View style={styles.smallerInfoContainer}>
                    <View style={styles.nameAndFollowButtonContainer}>
                        <Text style={styles.name}>{profileUsername}</Text>
                        {followButton()}
                    </View>
                    <View style={styles.followerFollowingContainer}>
                        {followFollowing(
                            'Seguidores',
                            profileNumberOfFollowers,
                            profileId,
                        )}
                        {followFollowing(
                            'Seguindo',
                            profileNumberOfFollowing,
                            profileId,
                        )}
                    </View>
                </View>
            </View>
            <View style={styles.profileCardContainer}>{profileImage()}</View>
        </View>
    );
};

export default socialNetworkProfilePage;
