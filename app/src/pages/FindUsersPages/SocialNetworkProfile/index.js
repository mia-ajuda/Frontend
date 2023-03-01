import React, { useState, useContext, useEffect } from 'react';
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
import callService from '../../../services/callService';
import socialNetworkProfileservice from '../../../services/socialNetworkProfile';
import findUserPageStyles from '../styles';
import colors from '../../../../assets/styles/colorVariables';
import HistoricCard from '../../../components/HistoricCard';
import { UserContext } from '../../../store/contexts/userContext';
import FollowFollowingText from '../../../components/follow_followingText';

const SocialNetworkProfilePage = ({ navigation, route }) => {
    const [isFollowing, setIsFollowing] = useState(null);
    const [followButtonName, setFollowButtonName] = useState(null);
    const [activities, setActivities] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useContext(UserContext);
    const {
        selectedProfileId,
        selectedProfileUsername,
        selectedProfileNumberOfFollowers,
        selectedProfileNumberOfFollowing,
        selectedProfilePhoto,
        selectedProfileIsFollowing,
        selectedProfileUserId,
    } = route.params;

    async function setupPage() {
        let button_name = selectedProfileIsFollowing ? 'Seguindo' : 'Seguir';
        setIsFollowing(selectedProfileIsFollowing);
        setFollowButtonName(button_name);
        setIsLoading(true);
        let temp_activities;
        temp_activities = await callService(
            socialNetworkProfileservice,
            'getUserActivities',
            [selectedProfileUserId],
        );
        setActivities(temp_activities);
        setIsLoading(false);
    }

    useEffect(() => {
        setupPage();
    }, []);

    const followButton = () => {
        return (
            selectedProfileUserId !== user._id && (
                <Button
                    title={followButtonName}
                    type="default"
                    press={async () => {
                        let tempIsFollowing;
                        if (isFollowing) {
                            tempIsFollowing = await callService(
                                socialNetworkProfileservice,
                                'unfollowUser',
                                [selectedProfileId, user._id],
                            );
                        } else {
                            tempIsFollowing = await callService(
                                socialNetworkProfileservice,
                                'followUser',
                                [selectedProfileId, user._id],
                            );
                        }
                        let button_name = tempIsFollowing
                            ? 'Seguindo'
                            : 'Seguir';
                        setIsFollowing(tempIsFollowing);
                        setFollowButtonName(button_name);
                    }}
                />
            )
        );
    };

    const profileImage = function () {
        return (
            <Image
                style={styles.profileImage}
                source={{
                    uri: `data:image/png;base64,${selectedProfilePhoto}`,
                }}
            />
        );
    };

    const helpCards = () => {
        return (
            <View>
                {activities?.helps?.map((help) => (
                    <TouchableOpacity
                        key={help._id}
                        onPress={() =>
                            navigation.navigate('myOfferHelpDescription', {
                                helpId: help._id,
                                routeId: 'Help',
                            })
                        }
                    >
                        <HistoricCard object={help} isRiskGroup={false} />
                    </TouchableOpacity>
                ))}
            </View>
        );
    };

    const offerCards = () => {
        return (
            <View>
                {activities?.offers?.map((help) => {
                    return (
                        <TouchableOpacity
                            key={help._id}
                            onPress={() =>
                                navigation.navigate('mapHelpDescription', {
                                    help: help,
                                    helpType: 'offer',
                                })
                            }
                        >
                            <HistoricCard object={help} isRiskGroup={false} />
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
                        <Text style={styles.name}>
                            {selectedProfileUsername}
                        </Text>
                        {followButton()}
                    </View>
                    <View style={styles.followerFollowingContainer}>
                        <FollowFollowingText
                            text="Seguidores"
                            number={selectedProfileNumberOfFollowers}
                            selectedProfileId={selectedProfileId}
                            navigation={navigation}
                        />
                        <FollowFollowingText
                            text="Seguindo"
                            number={selectedProfileNumberOfFollowing}
                            selectedProfileId={selectedProfileId}
                            navigation={navigation}
                        />
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
