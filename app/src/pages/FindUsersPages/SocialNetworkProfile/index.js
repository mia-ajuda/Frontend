import React, { useState, useEffect } from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import styles from './styles';
import Button from '../../../components/UI/button';
import useService from '../../../services/useService';
import socialNetworkProfileservice from '../../../services/socialNetworkProfile';
import MyRequestCard from '../../../components/MyRequestCard';
import findUserPageStyles from '../styles';
import colors from '../../../../assets/styles/colorVariables';
const SocialNetworkProfilePage = ({ navigation, route }) => {
    const [isFollowing, setIsFollowing] = useState(null);
    const [followButtonName, setFollowButtonName] = useState(null);
    const [activities, setActivities] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const {
        profileId,
        profileUsername,
        profileNumberOfFollowers,
        profileNumberOfFollowing,
        profilePhoto,
        profileIsFollowing,
        userId,
        profileUserId,
    } = route.params;

    useEffect(() => {
        console.log('to no profile');
        let button_name = profileIsFollowing ? 'Seguindo' : 'Seguir';
        setIsFollowing(profileIsFollowing);
        setFollowButtonName(button_name);
        setIsLoading(true);

        const getActivities = async () => {
            let temp_activities;
            temp_activities = await useService(
                socialNetworkProfileservice,
                'getUserActivities',
                [profileUserId],
            );
            setActivities(temp_activities);
            setIsLoading(false);
        };
        getActivities();
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
                onPress={() => console.log(text + ' ' + profileId)}
            >
                <Text style={styles.text}>
                    {' '}
                    {number} {text}{' '}
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

    const helpCards = () => {
        return (
            <View>
                {activities.helps.map((help) => (
                    <TouchableOpacity
                        key={help._id}
                        onPress={() =>
                            navigation.navigate('MyRequestHelpDescription', {
                                help,
                            })}>
                        <MyRequestCard
                            object={help}
                            deleteVisible={false}
                            possibleInterestedList={help.possibleHelpers}
                        />
                    </TouchableOpacity>
                ))}
            </View>
        );
    };

    const offerCards = () => {
        return (
            <View>
                {activities.offers.map((help) => {
                    return (
                        <TouchableOpacity
                            key={help._id}
                            onPress={() =>
                                navigation.navigate('MyOfferHelpDescription', {
                                    helpId: help._id,
                                    routeId: 'HelpOffer',
                                })
                            }
                        >
                            <MyRequestCard
                                object={help}
                                possibleInterestedList={[
                                    ...help.possibleHelpedUsers,
                                    ...help.helpedUserId,
                                ]}
                                deleteVisible={false}
                            />
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    };

    const renderLoadingIndicator = () => (
        <View style={styles.loadingContainer}>
            <ActivityIndicator
                style={findUserPageStyles.loading}
                size="large"
                color={colors.primary}
            />
        </View>
    );

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
            <View style={styles.cardContainer}>
                {isLoading ? (
                    renderLoadingIndicator()
                ) : (
                    <ScrollView>
                        {helpCards()}
                        {offerCards()}
                    </ScrollView>
                )}
            </View>
        </View>
    );
};

export default SocialNetworkProfilePage;
